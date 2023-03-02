// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../contracts/interface/IHardHatContract.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract HardHatContractV2 is IHardHatContract {
    using SafeMath for uint256;
    address private owner;
    mapping(address => uint256) balances;
    uint256 private totalBalance;

    function initialize(address) public {
        owner = msg.sender;
    }

    function addBalance() public payable {
        require(msg.value > 0, "Balance must be > 0");
        totalBalance += msg.value;
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
        return totalBalance;
    }
}