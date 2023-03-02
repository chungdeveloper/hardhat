// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IHardHatContract {

    function addBalance() external payable;

    function getBalanceOf() external view returns (uint256);

    function getNativeBalanceOf() external view returns (uint256);

    function getOwner() external view returns (address);

    function getOwnerVl() external view returns (address);

}