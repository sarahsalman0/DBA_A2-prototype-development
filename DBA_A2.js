const web3 = new Web3(window.ethereum);
const contract_address = ''; //
const contract_abi = [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [
{
"internalType": "address",
"name": "user",
"type": "address"
}
],
"name": "getBalance",
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
}
];

let userAddress = null;
const contract = new web3.eth.Contract(contract_abi, contract_address);

async function connectWallet() {
  if (window.ethereum) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  userAddress = accounts[0];
  console.log("Connected:", userAddress);
  } else {
  alert("Please install MetaMask!");
  }
  const el = document.getElementById("address");
  if (el) el.innerText = userAddress || '—';
}

async function getMyBalance() {
  if (!contract || !userAddress) return alert("Connect wallet first");
  const myBal = await contract.methods.getMyBalance().call({
  from: userAddress
  });
  const el = document.getElementById("balance");
  if (el) el.innerText = myBal;
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

  async function get_number_of_propsal() {
    
  }

  async function if_reviewer() {

  }

  async function move_to_next_phase() {
    
  }