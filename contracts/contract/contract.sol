// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Funds{
  uint public totalFunds;
  address owner;

  constructor (address _owner) payable {
    owner =_owner;
    totalFunds = msg.value;
  }

  modifier onlyOwner(){
    require(msg.sender == owner , "not the owner");
    _;
  }

  function withdraw (uint _amount) public onlyOwner {
    require(_amount <= totalFunds, "Insufficient funds");
    totalFunds -= _amount;
    payable(owner).transfer(_amount);
  }

  function stop() public {
    owner =msg.sender;
  }
}
