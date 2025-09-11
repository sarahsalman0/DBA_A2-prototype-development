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

    // Struct to store candidate information and vote count
    struct CustomTopic{
        address CustomAddress;
        uint voteCount;
    }


    string public topic;
    address[] private customTopic;
    address[] public voters;

    mapping(address => bool) private isCustomTopic;
    mapping(address => bool) public isVoter;
    
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

   event SessionInitialised(address indexed admin, uint256 candidates, uint256 voters);



    function initialiseElection(address[] calldata _customTopic, address[] calldata _voters) external notInitialised {
        admin = msg.sender;



        sessionInitialised = true;
        emit SessionInitialised(admin, customTopic.length, voters.length);
    }

    function getCustomTopic(){

    }

    function getVoters(){

    }

    function getTopic() external view returns (string memory){
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



     // Ends the election (admin only)
    function endingElection() external adminAccess openedElection {
        electionClosed = true;
        electionOpened = false;
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