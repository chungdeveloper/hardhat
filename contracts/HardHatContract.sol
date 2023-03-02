// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract HardHatContract {

    mapping(address => uint256) balances;

    function addBalance() public payable {
        require(msg.value>0, "Balance must be > 0");
        balances[msg.sender] = msg.value;
    }

    function getBalanceOf() public view returns (uint256){
        return balances[msg.sender];
    }

    function getNativeBalanceOf() public  view returns (uint256){
        return msg.sender.balance;
    }
}