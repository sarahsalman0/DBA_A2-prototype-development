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
    uint256 public roundId; 
    enum Phase { Idle, Setup, Voting, Reveal }
    Phase public phase;

    //Structure
    struct Option { string label; uint256 count; }
    struct Round {
        string topic;
        Option[] options;

        mapping(address => bool) hasVoted;
        mapping(address => uint256) voteOf;
        mapping(address => bool) excluded;

        address[] excludedList;
        bool resultsRevealed;
    }

    mapping(uint256 => Round) private rounds;
    
    //Errors
    error AlreadyInitialised();

    //Modifiers
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

    modifier notInitialised() {
        require(!sessionInitialised, "Election already initialised");
        _;
    }

    modifier inPhase(Phase p) { 
        require(phase == p, "WrongPhase");
        _; 
    }

    modifier validOption(uint256 i) { 
        require(i < rounds[roundId].options.length, "InvalidOption"); 
        _; 
    }

    //Constructor
    constructor() {
        admin = msg.sender;
        phase = Phase.Idle;
        sessionInitialised = false;
        electionOpened = false;
        electionClosed = false;
    }


    //Events
    event ProposalInitialized(uint256 indexed roundId, address indexed admin, string topic, string[] options);
    event ProposalUpdated(uint256 indexed roundId, string topic, string[] options);
    event ProposalReset(uint256 indexed oldRoundId, uint256 indexed newRoundId);
    event PhaseChanged(uint256 indexed roundId, uint8 phase); // uint8(Phase)
    event VotingStarted(uint256 indexed roundId);
    event VotingEnded(uint256 indexed roundId);
    event EligibilityUpdated(uint256 indexed roundId, address indexed participant, bool isExcluded);
    event VoteCast(uint256 indexed roundId, address indexed voter, uint256 indexed optionIndex);
    event ResultsRevealed(uint256 indexed roundId, uint256[] winners, uint256[] counts);

    //Functions
    function _setPhase(Phase newPhase) internal {
        phase = newPhase;
        if (newPhase == Phase.Voting) {
            electionOpened = true;  electionClosed = false;
        } else if (newPhase == Phase.Reveal) {
            electionOpened = false; electionClosed = true;
        } else {
            electionOpened = false; electionClosed = false; // Idle or Setup
        }
        emit PhaseChanged(roundId, uint8(newPhase));
    }
    function createRound(string calldata topic, string[] calldata options) external onlyAdmin {

    }

    function initialiseElection(address[] calldata _customTopic, address[] calldata _voters) external notInitialised {
        admin = msg.sender;



        sessionInitialised = true;
        emit ProposalInitialized(roundId, admin, topic, options);
        emit PhaseChanged(roundId, uint8(Phase.Voting));
        emit VotingStarted(roundId);
    }


    function getVoters(){

    }

    // 3. Casting Votes // 

    function Vote() {

    }

    //shows whether a specific user has already voted
    function hasUserVoted(address user) public view returns (bool) {
       if (user == msg.sender) { //check if that user is the caller of the function
           return hasVoted[user]; //return true or false based on whether user has voted
       }
       revert("You cannot check others' vote status"); //prevents checking other voter status', protecting voter privacy
    }

    //shows user's own vote
    function viewMyVote() public view returns (address) {
       require(hasVoted[msg.sender], "You have not voted"); //if user has not voted, return error msg and do not continue
       return votes[msg.sender]; //if user has voted, return vote
   }

    // 4. Voter Eligibility //

    function excludeVoter() {

    }

    funtion reinstateVoter() {

    }

    function viewVoteList() {

    }


    // 5. Ending a Voting Round //

     // Ends the election (admin only)
    function endingElection() external adminAccess openedElection {
        electionClosed = true;
        electionOpened = false;
    }

    // 6. Revealing Results //

    // 7. Other Functionality //

    function getTopic() external view returns (string memory){

        Prop
        return topic;
    }

    function getTopicOptions() external view returns (address[] memory) {
        address[] memory out = new address[](customTopic.length);
        for (uint256 i = 0; i < customTopic.length; i++) {
            out[i] = customTopic[i];
        }
        return out;
    }

    function getElectionStatus() external view returns () {

    }

    // Read the caller’s balance
    function getMyBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Read any address balance
    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }

}