// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IMoonVaultConfig {
    function addWhiteListed(address[] memory _whitelisted) external;

    function removeWhiteListed(address[] memory whitelisted) external;

    function isWhiteList(address _address) external view returns (bool);
}