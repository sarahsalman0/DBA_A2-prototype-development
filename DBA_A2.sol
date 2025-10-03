// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract votingApp {
//Task 1: Starting a New Voting Session
    //Admin of the voting system
    address public admin;
     //The session has been initialised
    bool public sessionInitialised;
     // Election status when voting is open for voters
    bool public electionOpened;
    // Election status when voting has closed for voters
    bool public electionClosed;

    //Phase for the voting platform
    //Adds for each new round
    uint256 public roundId; 
    
    enum Phase { 
        Nothing, Setup, Voting, Results 
    }
    //To set the current phase of the platform
    Phase public phase;

    //Structures
    //To show the options on the webpage
    struct Option { 
        string label; 
        uint256 count; 
    }
    struct Round {
        // topic for the current round
        string topic;
        // list of all the option for current round
        Option[] options;
        // To see if they have voted and selected option
        mapping(address => bool) hasVoted;
        mapping(address => uint256) voteOf;
        // To show the eligible voters of the round
        mapping(address => bool) excluded;
        // Admin is able to see excluded voters
        address[] excludedList;
        // Admin is able to see voters that can vote
        address[] voters;
        // Makes sure that vote is only placed once
        bool resultsRevealed;
    }

    // Round ID for platform
    mapping(uint256 => Round) private rounds;
    
    //Modifiers
    // Requires only admin actions to be done
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can initiate an election");
        _;
    }

    // Requires the election to be opened to vote
    modifier openedElection(){
        require(electionOpened && !electionClosed, "This election has closed");
        _;
    }

    // Requires the election to be closed
    modifier closedElection(){
        require(electionClosed, "This election is still opened");
        _;
    }

    // Requires that the election has not started and is clean from previous
    modifier startedElection(){
        require(!electionOpened && !electionClosed, "This election has already begun");
        _;
    }

    // Requires the election to be initalised at the start only once
    modifier notInitialised() {
        require(!sessionInitialised, "Election already initialised");
        _;
    }

    // Requires to check which phase using enum
    modifier inPhase(Phase p) { 
        require(phase == p, "Currently in different phase");
        _; 
    }

    // Requires to makes sure option is in the current phase/round
    modifier validOption(uint256 i) { 
        require(i < rounds[roundId].options.length, "Not a valid option"); 
        _; 
    }

    //Constructor
    constructor() {
        // Admin must be the one to deploy the contract
        admin = msg.sender;
        // Make sure it exist before starting an eleection
        phase = Phase.Nothing;
        sessionInitialised = false;
        electionOpened = false;
        electionClosed = false;
    }


    //Events
    event ProposalInitialised(uint256 indexed roundId, address indexed admin, string topic, string[] options);
    event ProposalUpdated(uint256 indexed roundId, string topic, string[] options);
    event ProposalReset(uint256 indexed oldRoundId, uint256 indexed newRoundId);
    event PhaseChanged(uint256 indexed roundId, uint8 phase); // uint8(Phase)
    event VotingStarted(uint256 indexed roundId);
    event VotingEnded(uint256 indexed roundId);
    event EligibilityUpdated(uint256 indexed roundId, address indexed participant, bool isExcluded);
    event VoteCast(uint256 indexed roundId, address indexed voter, uint256 indexed optionIndex);
    event ResultsRevealed(uint256 indexed roundId, uint256[] winners, uint256[] counts);

    //Functions
    function setPhase(Phase newPhase) internal {
        // Update with enum each phase
        phase = newPhase;

        // Boolean to see if phase is starting 
        if (newPhase == Phase.Voting) {
            electionOpened = true;  electionClosed = false;
        } else if (newPhase == Phase.Results) {
            electionOpened = false; electionClosed = true;
        } else {
            // Nothing has been set up for a phase
            electionOpened = false; electionClosed = false;
        }
        emit PhaseChanged(roundId, uint8(newPhase));
    }

    // Must be completed for the first time to initalise a session
    function initialisedSession(string calldata _topic, string[] calldata _options) external onlyAdmin notInitialised startedElection { 
        // New round with topic and options can be set up for every round
        settingElection(_topic, _options);
        // Initalise for the platform
        sessionInitialised = true;
    }


    // Reset the session to a clean and new round
    function resetSession() external onlyAdmin {
    uint256 oldId = roundId;

    // get current round storage reference
    Round storage r = rounds[roundId];

    // wipe topic
    r.topic = "";

    // wipe array
    delete r.options;
    delete r.excludedList;
    delete r.voters;

    // reset mappings (cannot delete mappings directly, but can ignore old values,
    // since a new roundId will be used for the new session)
    // e.g. r.hasVoted[...] will never be checked again once roundId increments.

    // reset flags
    sessionInitialised = false;
    electionOpened = false;
    electionClosed = false;

    // increment roundId for next session
    roundId++;

    // emit event
    emit ProposalReset(oldId, roundId);
}


    // Creating a new round for each session
    function settingElection(string calldata _topic, string[] calldata _options) internal {
        // Makes sure that there is two options to have a voting platform
        require(_options.length >= 2, "Need>=2 options");

        // Increment the roundID for each new round with a counter
        roundId += 1;
        Round storage r = rounds[roundId];

        // Able to delete the round 
        delete r.options;
        delete r.excludedList;
        // Keep note of the topic and ability to reset the round
        r.topic = _topic;
        r.resultsRevealed = false;

        // Create the options that will be visible for voters to pick
        for (uint i = 0; i < _options.length; i++) {
            r.options.push(Option({ label: _options[i], count: 0 }));
        }

        // Enter the Setup phase and show it on the interface that it is starting the next round
        setPhase(Phase.Setup);
        emit ProposalInitialised(roundId, admin, r.topic, _labels(r));
    }

    // Returns all the addresses of voters who have voted in the current round
    function getVoters() public view returns (address[] memory) {
        return rounds[roundId].voters;
    }

    // 3. Casting Votes //
    // Admin must open the voting status, from setup to voting
    function startVoting() external onlyAdmin inPhase(Phase.Setup) {
        setPhase(Phase.Voting);
        emit VotingStarted(roundId);
    } 

    // A voter can put only one vote in from the valid options that are avaliable
    function Vote(uint256 optionIndex) external openedElection inPhase(Phase.Voting) validOption(optionIndex) {
        Round storage r = rounds[roundId];
        // Admin is not allowed to vote
        require(msg.sender != admin, "Admin cannot vote");
        // Blocks any ineligible voters from casting a vote
        require(!r.excluded[msg.sender], "Ineligible voter");
        // Only able to vote once per round
        require(!r.hasVoted[msg.sender], "Already voted");

        // Shows what the voter they have voted and their option
        r.hasVoted[msg.sender] = true;
        r.voteOf[msg.sender]   = optionIndex;

        // Creates a list of all the voters for the admin
        r.voters.push(msg.sender); 

        // Increases the option count based off the votes
        r.options[optionIndex].count += 1;

        // Displays the results in the interface
        emit VoteCast(roundId, msg.sender, optionIndex);
    }

    // Shows whether a specific user has already voted
    function hasVoted(address user) external view returns (bool) {
        return rounds[roundId].hasVoted[user];
    }

    // Shows user's own vote, but not other voters
    function viewMyVote() public view returns (bool voted, uint256 optionIndex, string memory optionText) {
      Round storage r = rounds[roundId];
        voted = r.hasVoted[msg.sender];
        if (voted) {
            optionIndex = r.voteOf[msg.sender];
            optionText  = r.options[optionIndex].label;
        } else {
            optionIndex = type(uint256).max;
            optionText  = "";
        }
   }

    // Admin is able to check whether a specific voter has voted 
   function adminViewVoterStatus(address user) external view onlyAdmin returns (bool voted) {
        voted = rounds[roundId].hasVoted[user];
    }


    // 4. Voter Eligibility //

    // Exclude a specific voter (by address) from the current round in setup
   function excludeVoter(address user) external onlyAdmin inPhase(Phase.Setup) {
        Round storage r = rounds[roundId];
        if (!r.excluded[user]) {
            r.excluded[user] = true;
            r.excludedList.push(user);
            emit EligibilityUpdated(roundId, user, true);
        }
    }

    // Makes sure that any excluded voters are reinstated back in
    function reinstateVoter(address user)  external onlyAdmin inPhase(Phase.Setup) {
        Round storage r = rounds[roundId];
        if (r.excluded[user]) {
            r.excluded[user] = false;

            // Counter to remove from the excluded list
            for (uint i = 0; i < r.excludedList.length; i++) {
                if (r.excludedList[i] == user) {
                    r.excludedList[i] = r.excludedList[r.excludedList.length - 1];
                    r.excludedList.pop();
                    break;
                }
            }
            emit EligibilityUpdated(roundId, user, false);
        }
    }

    //Admin is able to read the current excluded list for the round
    function getExcluded() external view onlyAdmin returns (address[] memory list) {
        Round storage r = rounds[roundId];
        list = new address[](r.excludedList.length);
        for (uint i = 0; i < r.excludedList.length; i++) list[i] = r.excludedList[i];
    }

    // Admin is able to see a list of who has voted or excluded in one list
    function viewVoteList() public view onlyAdmin returns (address[] memory voters, bool[] memory voted, bool[] memory isExcludedNow) {
        Round storage r = rounds[roundId];
        uint256 n = r.voters.length;

        voters = new address[](n);
        voted  = new bool[](n);
        isExcludedNow = new bool[](n);

        for (uint256 i = 0; i < n; i++) {
            address a = r.voters[i];
            voters[i] = a;
            voted[i] = r.hasVoted[a];         
            isExcludedNow[i] = r.excluded[a];  
        }
    }


    // 5. Ending a Voting Round //
    // Admin must be able to change the phase from voting to results to stop any more votes coming in
    function endingElection() external onlyAdmin openedElection inPhase(Phase.Voting) {
        setPhase(Phase.Results);
        emit VotingEnded(roundId);
    }

    // 6. Revealing Results //
    // In results phase the winner is calculated and put in a summary
    function revealResults() external onlyAdmin closedElection inPhase(Phase.Results) {
        Round storage r = rounds[roundId];
        require(!r.resultsRevealed, "Resuslts Already Revealed");

        // Finds the highest count from the options
        uint256 maxCount = 0;
        for (uint i = 0; i < r.options.length; i++) {
            if (r.options[i].count > maxCount) maxCount = r.options[i].count;
        }

        // Counts how many options tie (if needed)
        uint winnersCount = 0;
        for (uint i = 0; i < r.options.length; i++) {
            if (r.options[i].count == maxCount) winnersCount++;
        }
    
        // gets the details of the winners
        uint256[] memory winners = new uint256[](winnersCount);
        uint idx = 0;
        for (uint i = 0; i < r.options.length; i++) {
            if (r.options[i].count == maxCount) winners[idx++] = i;
        }
        
        // Makes the results final and sends it to the interface
        r.resultsRevealed = true;
        emit ResultsRevealed(roundId, winners, _counts(r));
    }

    // Admin and voters are able to read the results from the interface only in that phase
    function getResults() external view closedElection inPhase(Phase.Results) returns (string[] memory optionTexts, uint256[] memory counts) {
        Round storage r = rounds[roundId];
        optionTexts = _labels(r);
        counts      = _counts(r);
    }

    // 7. Other Functionality //

    // Anyone can see the current topic
    function getTopic() external view returns (string memory){
        return rounds[roundId].topic;
    }

    // Anyone can see the topic options
    function getOptions() external view returns (string[] memory labels) {
        return _labels(rounds[roundId]);
    }

    // Interface layout for the Election status 
    function getElectionStatus() external view returns (uint256 _roundId, string memory phaseName, bool _sessionInitialised, bool _electionOpened, bool _electionClosed) {
        _roundId = roundId;
        _sessionInitialised = sessionInitialised;
        _electionOpened  = electionOpened;
        _electionClosed  = electionClosed;

        if (phase == Phase.Nothing)        phaseName = "Not Started";
        else if (phase == Phase.Setup)  phaseName = "Seting up";
        else if (phase == Phase.Voting) phaseName = "Voting";
        else                            phaseName = "Results";
    }

    // Read the caller's wallet
    function getMyWallet() external view returns (address) {
        return msg.sender;
    }

    // Read the caller’s balance
    function getMyBalance() public view returns (uint256) {
        return msg.sender.balance;
    }

    // Read any address balance
    function getBalance() public view returns (uint256 chainId, string memory name) {
        chainId = block.chainid; name = _chainName(chainId);
    }

    // Memory array with all the options made into labels 
    function _labels(Round storage r) internal view returns (string[] memory labels) {
        labels = new string[](r.options.length);
        for (uint i = 0; i < r.options.length; i++) labels[i] = r.options[i].label;
    }

    // Memory array with all the option counts 
    function _counts(Round storage r) internal view returns (uint256[] memory counts) {
        counts = new uint256[](r.options.length);
        for (uint i = 0; i < r.options.length; i++) counts[i] = r.options[i].count;
    }

    // ChainID to make sure that it is in the correct currency
    function _chainName(uint256 id) internal pure returns (string memory) {
        if (id == 1)        return "Ethereum Mainnet";
        if (id == 11155111) return "Sepolia";
        if (id == 5)        return "Goerli (legacy)";
        if (id == 10)       return "OP Mainnet";
        if (id == 137)      return "Polygon";
        if (id == 8453)     return "Base";
        if (id == 42161)    return "Arbitrum One";
        if (id == 43114)    return "Avalanche C-Chain";
        return "Unknown";
    }

}

