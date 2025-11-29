const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const amount = 10_000_000_000_000_000_000n;

module.exports = buildModule("FundsModule", (m) => {
const owner = m.getParameter("owner","0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
const amount1 = m.getParameter("totalFunds", amount);

  // Deploy Funds contract
  const Funds = m.contract("Funds", [owner], {
    value: amount1, 
  });

  return { Funds };
});
