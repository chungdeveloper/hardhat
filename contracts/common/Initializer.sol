// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Initializer {
    bool private isInitialized;

    modifier initialize() {
        require(!isInitialized, "Contract initialized");
        isInitialized = true;
        _;
    }
}
