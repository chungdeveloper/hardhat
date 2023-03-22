// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;



contract TestContract {
    address  private owner;
    bool private isInitialized;
    mapping(address => uint256) private balances;

    modifier initFunction() {
        require(!isInitialized, "Contract was initialized");
        isInitialized = true;
        _;
    }

    function initialization() external initFunction {
        owner = msg.sender;
    }

    function deposit(uint256 amount) public payable {
        balances[msg.sender] =  balances[msg.sender] + amount;
        (payable(address(this))).transfer(amount);
    }
}