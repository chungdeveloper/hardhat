// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ownable {
    address private owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Auth error");
        _;
    }

    function Ownable__init() internal {
        owner = msg.sender;
    }
}
