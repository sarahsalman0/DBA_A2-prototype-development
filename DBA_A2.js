const web3 = new Web3(window.ethereum);
const contract_address = '0x686cc501CF498C8211835cFebab8828927Cda300'; //
const contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"participant","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"EligibilityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"phase","type":"uint8"}],"name":"PhaseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"string","name":"topic","type":"string"},{"indexed":false,"internalType":"string[]","name":"options","type":"string[]"}],"name":"ProposalInitialised","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"oldRoundId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"newRoundId","type":"uint256"}],"name":"ProposalReset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"string","name":"topic","type":"string"},{"indexed":false,"internalType":"string[]","name":"options","type":"string[]"}],"name":"ProposalUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"winners","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"counts","type":"uint256[]"}],"name":"ResultsRevealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"uint256","name":"optionIndex","type":"uint256"}],"name":"VoteCast","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"VotingEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"VotingStarted","type":"event"},{"inputs":[{"internalType":"uint256","name":"optionIndex","type":"uint256"}],"name":"Vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"admindViewVoterStatus","outputs":[{"internalType":"bool","name":"voted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"electionClosed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"electionOpened","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endingElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"excludeVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getElectionStatus","outputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"},{"internalType":"string","name":"phaseName","type":"string"},{"internalType":"bool","name":"_sessionInitialised","type":"bool"},{"internalType":"bool","name":"_electionOpened","type":"bool"},{"internalType":"bool","name":"_electionClosed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExcluded","outputs":[{"internalType":"address[]","name":"list","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOptions","outputs":[{"internalType":"string[]","name":"labels","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResults","outputs":[{"internalType":"string[]","name":"optionTexts","type":"string[]"},{"internalType":"uint256[]","name":"counts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTopic","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVoters","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"hasVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_topic","type":"string"},{"internalType":"string[]","name":"_options","type":"string[]"}],"name":"initialisedSession","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"phase","outputs":[{"internalType":"enum votingApp.Phase","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"reinstateVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_topic","type":"string"},{"internalType":"string[]","name":"_options","type":"string[]"}],"name":"resetSession","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealResults","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"roundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sessionInitialised","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startVoting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"viewMyVote","outputs":[{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"uint256","name":"optionIndex","type":"uint256"},{"internalType":"string","name":"optionText","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"viewVoteList","outputs":[{"internalType":"address[]","name":"voters","type":"address[]"},{"internalType":"bool[]","name":"voted","type":"bool[]"},{"internalType":"bool[]","name":"isExcludedNow","type":"bool[]"}],"stateMutability":"view","type":"function"}]

let userAddress = null;
const contract = new web3.eth.Contract(contract_abi, contract_address);

//display

async function connectWallet() {
  if (window.ethereum) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  userAddress = accounts[0];
  console.log("Connected:", userAddress);
  } else {
  alert("Please install MetaMask!");
  return null;
  }
  const el = document.getElementById("address");
  if (el) el.innerText = userAddress || '—';

  return userAddress;
}


async function getMyBalance() {
  if (!contract || !userAddress) return alert("Connect wallet first");
  const myBal = await contract.methods.getMyBalance().call({ from: userAddress });
  const el = document.getElementById("balance");
  if (el) el.innerText = myBal;
  return myBal;
}
  
  
async function getBalanceOf() {
  if (!contract) return alert("Connect wallet first");
  const inputAddress = document.getElementById("addressInput").value;
  
  
  if (!web3.utils.isAddress(inputAddress)) {
  alert("Invalid Ethereum address");
  return;
  }

  // Call the smart contract function with the address
  const balance = await contract.methods.getBalance(inputAddress).call();
  
  const elAddr = document.getElementById("inputAddress");
  if (elAddr) elAddr.innerText = inputAddress;
  const elBal = document.getElementById("balanceOf");
  if (elBal) elBal.innerText = balance;
  }


  async function get_current_network(){
    // get current eth network
    const eth_network = await window.ethereum.request({
        method: 'eth_chainId',
        params: []
    });
    var current_network = parseInt(eth_network, 16);
    // console.log(typeof(current_network));
    var result;
    switch (current_network) {
                    case 1:
                    result = "Mainnet";
                    break
                    case 5:
                    result = "Goerli";
                    break
                    case 11155111:
                    result =  "Sepolia";
                    break
                    case 2018:
                    result =  "Dev";
                    break
                    case 63:
                    result =  "Mordor";
                    break
                    case 61:
                    result =  "Classic";
                    break
                    default:
                    result =  "unknow";
            }
    return result;
}


async function getAdmin() {

try {
  return await contract.methods.admin().call();
}
  catch (error) {
  connectError.innerHTML = error.message;
  console.log(error);
  return null;
}
}

async function getCurrentPhase() {
  try {
    return await contract.methods.phase().call();
  }
  catch (error) {
    connectError.innerHTML = error.message;
    console.log(error);
    return null;
  }
}


async function getOptions() {
  try {
    return await contract.methods.getOptions().call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getTopic() {
  try {
    return await contract.methods.getTopic().call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getResults() {
  try {
    return await contract.methods.getResults().call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getElectionStatus(id, phase, initialised, electionOpened, electionClosed) {
  try {
    return await contract.methods.getElectionStatus().call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function hasVoted(addr) {
  try {
    return await contract.methods.hasVoted(addr).call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function viewMyVote() {
  try {
    return await contract.methods.viewMyVote().call({ from: userAddress });
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getVoters() {
  try {
    return await contract.methods.getVoters().call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getExcluded() {
  try {
    return await contract.methods.getExcluded().call();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
async function get_number_of_propsal() {
  try {
    return await contract.methods.getOptions().call(); //double check this one 
  }
  catch (error) {
    connectError.innerHTML = error.message;
    console.log(error);
    return null;
  }
}

async function if_reviewer(userAddress) {
  try {
    return await contract.methods.adminViewVoterStatus(userAddress).call(); 
  }
  catch (error) {
    connectError.innerHTML = error.message;
    console.log(error);
    return null;
  }
}*/


//admin actions

async function initialiseSession(topic, options) {

  try {
  const from_address = await connectWallet();
  await contract.methods.initialisedSession(topic, options).call({ from: from_address });
  const receipt = await contract.methods.initialisedSession(topic, options).send({from: from_address});
  console.log(receipt);
  return receipt;
  }
  catch (error) {
    connectError.innerHTML = error.message;
    console.log(error);
    return null;
  }
}


async function startVoting() {

  try {
    const from_address = await connectWallet();
    await contract.methods.startVoting().call({ from: from_address });
    const receipt = await contract.methods.startVoting().send({from: from_address});
    console.log("Voting started:",receipt);
    return receipt;
    }
    catch (error) {
      connectError.innerHTML = error.message;
      console.log(error);
      return null;
    }
}


async function endVoting() {

  try {
    const from_address = await connectWallet();
    await contract.methods.endingElection().call({ from: from_address });
    const receipt = await contract.methods.endingElection().send({from: from_address});
    console.log("Voting ended:", receipt);
    return receipt;
    }
    catch (error) {
      connectError.innerHTML = error.message;
      console.log(error);
      return null;
    }
}


async function revealResults() {
  try {
    const from_address = await connectWallet();
    await contract.methods.revealResults().call({ from: from_address });
    const receipt = await contract.methods.revealResults().send({from: from_address});
    console.log("Results:",receipt);
    return receipt;
    }
    catch (error) {
      connectError.innerHTML = error.message;
      console.log(error);
      return null;
    }
}


async function resetSession(topic, options) {
  try {
    const from_address = await connectWallet();
    await contract.methods.resetSession().call({ from: from_address });
    const receipt = await contract.methods.resetSession().send({from: from_address});
    console.log("Session reset:",receipt);
    return receipt;
    }
    catch (error) {
      connectError.innerHTML = error.message;
      console.log(error);
      return null;
    }
}


async function excludeVoter(addr) {
  try {
    const from_address = await connectWallet();
    await contract.methods.excludeVoter().call({ from: from_address});
    const receipt = await contract.methods.excludeVoter(addr).send({ from: from_address });
    console.log("Voter excluded:", receipt);
    return receipt;
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}

async function reinstateVoter(addr) {
  try {
    const from_address = await connectWallet();
    await contract.methods.reinstateVoter().call({ from: from_address});
    const receipt = await contract.methods.reinstateVoter(addr).send({ from: from_address });
    console.log("Voter reinstated:", receipt);
    return receipt;
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}


//voter actions 

async function castVote(option) {
  try {
    const from_address = await connectWallet();
    await contract.methods.castVote().call({ from: from_address});
    const receipt = await contract.methods.Vote(option).send({ from: from_address });
    console.log("Vote cast:", receipt);
    return receipt;
  }
   catch (error) {
    console.error(error);
    return null;
  }
}