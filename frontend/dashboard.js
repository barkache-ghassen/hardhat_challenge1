// Connect to local Hardhat blockchain
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Load Solidity code from project folder
async function loadContractCode() {
  try {
    const response = await fetch('/contracts/contract/contract.sol'); // path relative to HTML
    const code = await response.text();
    document.getElementById('contract-code').textContent = code;
  } catch (err) {
    document.getElementById('contract-code').textContent = 'Error loading contract code: ' + err.message;
  }
}

// Fetch deployed contract address from Ignition JSON
async function fetchDeployedAddress() {
  try {
    const response = await fetch('ignition/deployments/chain-31337/deployed_addresses.json');
    const data = await response.json();
    const address = data.lock.target; // lock is the returned variable in Ignition module
    document.getElementById('contract-address').innerText = address;
    return address;
  } catch (err) {
    console.error('Error fetching deployed address:', err);
    document.getElementById('contract-address').innerText = 'Error';
    return null;
  }
}

// Fetch live contract balance
async function fetchContractBalance(address) {
  if (!address) return;
  try {
    const balance = await provider.getBalance(address);
    document.getElementById('contract-balance').innerText = ethers.formatEther(balance);
  } catch (err) {
    console.error('Error fetching contract balance:', err);
    document.getElementById('contract-balance').innerText = 'Error';
  }
}

// Initialize dashboard
async function initDashboard() {
  await loadContractCode();
  const address = await fetchDeployedAddress();
  await fetchContractBalance(address);

  // Refresh balance every 5 seconds
  setInterval(() => fetchContractBalance(address), 5000);
}

// Start
initDashboard();
