const web3 = new Web3(window.ethereum);
const contract_address = '0xfB7086A8a545603Cb563a8D93FAa4f3342F18DE9'; 
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isExcluded",
				"type": "bool"
			}
		],
		"name": "EligibilityUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "endingElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "excludeVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_options",
				"type": "string[]"
			}
		],
		"name": "initialisedSession",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "phase",
				"type": "uint8"
			}
		],
		"name": "PhaseChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "options",
				"type": "string[]"
			}
		],
		"name": "ProposalInitialised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "oldRoundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "newRoundId",
				"type": "uint256"
			}
		],
		"name": "ProposalReset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "options",
				"type": "string[]"
			}
		],
		"name": "ProposalUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "reinstateVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetSession",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "winners",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "counts",
				"type": "uint256[]"
			}
		],
		"name": "ResultsRevealed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "revealResults",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "optionIndex",
				"type": "uint256"
			}
		],
		"name": "Vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "optionIndex",
				"type": "uint256"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "VotingEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			}
		],
		"name": "VotingStarted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "adminViewVoterStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionClosed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionOpened",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getElectionStatus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "phaseName",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_sessionInitialised",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_electionOpened",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_electionClosed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getExcluded",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "list",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOptions",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "labels",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getResults",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "optionTexts",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "counts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTopic",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoters",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "phase",
		"outputs": [
			{
				"internalType": "enum votingApp.Phase",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roundId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sessionInitialised",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewMyVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "optionIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "optionText",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewVoteList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "voters",
				"type": "address[]"
			},
			{
				"internalType": "bool[]",
				"name": "voted",
				"type": "bool[]"
			},
			{
				"internalType": "bool[]",
				"name": "isExcludedNow",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let userAddress = null;
const contract = new web3.eth.Contract(abi, contract_address);

//display

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    userAddress = (accounts && accounts.length) ? accounts[0] : null;

    const $addr = document.getElementById("walletAddress") || document.getElementById("address");
    if ($addr) $addr.innerText = userAddress ?? "-";

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const $net = document.getElementById("network");
    if ($net) $net.innerText = chainId;

    if (userAddress) {
      const balWei = await web3.eth.getBalance(userAddress);
      const balEth = web3.utils.fromWei(balWei, "ether");
      const $bal = document.getElementById("balance");
      if ($bal) $bal.innerText = `${Number(balEth).toFixed(4)} ETH`;
    }

    window.ethereum.on("accountsChanged", async (accs) => {
      userAddress = (accs && accs.length) ? accs[0] : null;
      if ($addr) $addr.innerText = userAddress ?? "-";
      if (userAddress) {
        const balWei = await web3.eth.getBalance(userAddress);
        const balEth = web3.utils.fromWei(balWei, "ether");
        const $bal = document.getElementById("balance");
        if ($bal) $bal.innerText = `${Number(balEth).toFixed(4)} ETH`;
      }
    });
    window.ethereum.on("chainChanged", () => window.location.reload());
    console.log("Connected:", userAddress);
    return userAddress;
  } 
  
  catch (err) {
    console.error("User denied account access:", err);
    return null;
  }
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
  const inputAddress = document.getElementById("addressInput")?.value?.trim();
  if(!inputAddress) return alert("Enter an address");
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
  return balance;
}


  async function get_current_network(){
    // get current eth network
    const eth_network = await window.ethereum.request({
        method: 'eth_chainId',
        params: []
    });
    const current_network = parseInt(eth_network, 16);
    // console.log(typeof(current_network));
    let result;
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
        result =  "unknown";
    }
    const el = document.getElementById("networkName");
    if (el) el.innerText = result;
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

//admin actions

async function initialiseSession(topic, optionsCsv) {
  try {
    const from_address = await connectWallet();

    // turn comma-separated string into array
    const options = optionsCsv.split(",").map(o => o.trim()).filter(o => o.length > 0);

    if (!topic || options.length === 0) {
      alert("Please enter a topic and at least one option.");
      return;
    }

    const admin = await contract.methods.admin().call();
    console.log("Admin address:", admin); //to confirm admin address (can delete later)

    // send transaction to contract
    const receipt = await contract.methods.initialisedSession(topic, options).send({ from: from_address });

    console.log("Session initialised:", receipt);
    alert("Session initialised successfully!");
    return receipt;
  } catch (error) {
    console.error("Error initialising session:", error);
    //connectError.innerHTML = error.message;
    return null;
  }
}

async function startVoting() {

  try {
    const from_address = await connectWallet();
    await contract.methods.startVoting().call({ from: from_address });
    const receipt = await contract.methods.startVoting().send({from: from_address});
    console.log("Voting started:",receipt);
    alert("voting has started!");
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


async function resetSession() {
  try {
    const from_address = await connectWallet();
    //await contract.methods.resetSession().call({ from: from_address });
    const receipt = await contract.methods.resetSession().send({ from: from_address });

    console.log("Session reset:", receipt);
    alert("Session reset successfully!");
    return receipt;

  } catch (error) {
    console.error("Error resetting session:", error);
    if (connectError) connectError.innerHTML = error.message;
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
    await contract.methods.Vote(option).call({ from: from_address});
    const receipt = await contract.methods.Vote(option).send({ from: from_address });
    console.log("Vote cast:", receipt);
    return receipt;
  }
   catch (error) {
    console.error(error);
    return null;
  }
}

window.voting = {
  connectWallet,
  initialiseSession,   
  resetSession,
  startVoting,
  endVoting,
  revealResults,
  castVote,
  excludeVoter,
  reinstateVoter,

  // getters
  getExcluded,
  viewMyVote,
  getTopic,
  getOptions,
  getResults,
  getElectionStatus,
  getAdmin,
  getCurrentPhase,
  hasVoted,
  getVoters,

  // wallet/network helpers
  getMyBalance,
  getBalanceOf,
  get_current_network
};


window.uiResultsRevealed = window.uiResultsRevealed ?? false;

function setTxt(id, msg){ 
  const el = document.getElementById(id); 
  if (el) el.textContent = msg || ""; 
}

async function getAdminAddress(){
  try{
    if (window.voting?.getContractAdmin) return await window.voting.getContractAdmin();
    if (window.voting?.admin) return await window.voting.admin();
  }catch{} 
  return null;
}

async function getRole(){
  const me = await window.voting.myWallet();
  const admin = await getAdminAddress();
  return { me, admin, isAdmin: !!(me&&admin)&&me.toLowerCase()===admin.toLowerCase() };
}

async function getPhase(){
  const s = await window.voting.getStatus(); // {_roundId, phaseName, ...}
  return { s, phase: s.phaseName };
}

async function getMyVotingStatus(){
  try{ 
    const v = await window.voting.viewMyVote(); 
    return { voted: !!v.voted }; 
  }
  catch{ return { voted:false }; }
}

async function updateWarnings(){
  try{
    const [{ s, phase }, { isAdmin }, { voted }] = await Promise.all([ getPhase(), getRole(), getMyVotingStatus() ]);

    
    setTxt("warnStart",  !isAdmin ? "Admin only."  : phase!=="Setup"  ? "Can only start from Setup."  : "");
    setTxt("warnEnd",    !isAdmin ? "Admin only."  : phase!=="Voting" ? "Can only end during Voting." : "");
    setTxt("warnReveal", !isAdmin ? "Admin only."  : phase!=="Reveal" ? "Can only reveal in Reveal."  : "");

   
    setTxt("warnVote", phase!=="Voting" ? "You can vote only during the Voting phase."
                      : voted ? "You have already voted."
                      : "");
    setTxt("warnView", "");

    
    const lock = document.getElementById("resultsLockMsg");
    if (lock){
      lock.textContent = phase==="Voting"
        ? "Live voting status is never shown while voting is ongoing."
        : (phase!=="Reveal"
          ? "Results are available only after the coordinator reveals them in the Reveal phase."
          : "Reveal phase: coordinator can reveal, then everyone can view the summary.");
    }
    setTxt("warnGetResults",
      phase!=="Reveal" ? "Hidden until Reveal phase."
      : (!window.uiResultsRevealed ? "Coordinator must reveal before results can be viewed." : "")
    );
  }
  catch(e){ console.warn("updateWarnings failed", e); }
}

function hideResultsTable(){
  const tb=document.getElementById('resultsTable'); 
  const body=document.getElementById('resultsBody');
  if(body) body.innerHTML=''; 
  if(tb) tb.style.display='none';
}

async function revealAndRefresh(){
  try{
    await window.voting.revealResults(); 
    window.uiResultsRevealed = true;
    await fetchAndRenderResults();
  }catch(e){ console.error('Reveal failed:', e); }
  finally{ await updateWarnings(); }
}

async function fetchAndRenderResults() {
  try {
    const { phase } = await getPhase();
    if (phase !== "Reveal") return;

    const r = await window.voting.getResults();
    const options = r.optionTexts || r[0] || [];
    const counts  = r.counts      || r[1] || [];

    // find max votes
    const max = counts.reduce((m, x) => Math.max(m, Number(x || 0)), 0);

    // find winners
    const winners = options
      .map((label, i) => ({ label, i, c: Number(counts[i] || 0) }))
      .filter(o => o.c === max)
      .map(o => `${o.i}: ${o.label}`);

    // update winners element
    setTxt('winners', winners.length ? winners.join(', ') : "No winners");

    // render results table/list
    const resultsEl = document.getElementById("btnGetResults");
    if (resultsEl) {
      resultsEl.innerHTML = options
        .map((label, i) => `<li>${label}: ${counts[i] || 0} votes</li>`)
        .join("");
    }
  } catch (err) {
    console.error("Error fetching results:", err);
  }
}






