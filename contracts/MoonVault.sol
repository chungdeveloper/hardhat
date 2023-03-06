// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../contracts/common/Initializer.sol";
import "../contracts/common/Ownable.sol";
import "./config/IMoonVaultConfig.sol";

contract MoonVault is Initializer, Ownable {

    address private _token;
    IMoonVaultConfig private _config;

    uint256 debtVault;
    uint256 reserveVault;
    uint256 shareVault;

    function initializer(address token, address config) public initialize {
        _token = token;
        _config = IMoonVaultConfig(config);
    }

    

}
