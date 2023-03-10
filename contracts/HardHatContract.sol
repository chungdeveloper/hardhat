// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../contracts/interface/IHardHatContract.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract HardHatContract is IHardHatContract {
    using SafeMath for uint256;

    bool private isInitialized;
    address private owner;

    function initialize(address) public {
        require(!isInitialized, "Contract initialized");
        owner = msg.sender;
        isInitialized = true;
    }

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

    function getIBalanceOf() public view returns (uint256){
        return IHardHatContract(address(this)).getBalanceOf();
    }

    function getOwner() public view returns (address){
        return owner;
    }
}