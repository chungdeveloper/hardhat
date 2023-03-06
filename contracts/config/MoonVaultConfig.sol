// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../common/Ownable.sol";
import "./IMoonVaultConfig.sol";

contract MoonVaultConfig is Ownable, IMoonVaultConfig {

    mapping(address => bool) private _whiteListed;

    function addWhiteListed(address[] memory _whitelisted) public onlyOwner override {
        _updateWhiteListed(_whitelisted, true);
    }

    function removeWhiteListed(address[] memory whitelisted) public onlyOwner override {
        _updateWhiteListed(whitelisted, false);
    }

    function isWhiteList(address _address) external view override returns (bool) {
        return _whiteListed[_address];
    }

    // handleValue = true/false <=> add/remove
    function _updateWhiteListed(address[] memory _whitelisted, bool handleValue) private onlyOwner {
        for (uint i = 0; i < _whitelisted.length; i++) {
            _whiteListed[_whitelisted[i]] = handleValue;
        }
    }
}