// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../contracts/interface/IHardHatContract.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract HardHatContractV2 is IHardHatContract {
    using SafeMath for uint256;

    bool private isInitialized;
    address private owner;
    mapping(address => uint256) balances;

    function addBalance() public payable {
        require(msg.value > 0, "Balance must be > 0");
        balances[msg.sender] = msg.value;
    }

    function getBalanceOf() public view returns (uint256){
        return balances[msg.sender];
    }

    function getNativeBalanceOf() public view returns (uint256){
        return msg.sender.balance;
    }

    function getOwner() public view returns (address){
        return owner;
    }

    function getIBalanceOf() public view returns (uint256){
        return IHardHatContract(address(this)).getBalanceOf();
    }

    function getTotalBalance() public view returns (uint256){
        return address(this).balance;
    }

    function withdraw(uint256 balance) public {
        require(balances[msg.sender] > 0 && balance <= balances[msg.sender], "Balance not invalid");
        payable(msg.sender).transfer(balance);
        balances[msg.sender] = balances[msg.sender] - balance;
    }
}