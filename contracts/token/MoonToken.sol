// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MoonToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant EMPLOYEE_ROLE = keccak256("EMPLOYEE_ROLE");
    uint256 private constant CAP = 20000000000e18;

    uint256 private _totalLock;
    mapping(address => uint256) private _locks;
    mapping(address => uint256) private _lastUnlockBlock;

    constructor() ERC20("MoonToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function cap() public pure returns (uint256){
        return CAP;
    }

    function unlockedSupply() external view returns (uint256) {
        return totalSupply().sub(totalLock());
    }

    function totalLock() public view returns (uint256) {
        return _totalLock;
    }

    function totalBalanceOf(address _account) external view returns (uint256) {
        return _locks[_account].add(balanceOf(_account));
    }

    function lockOf(address _account) external view returns (uint256) {
        return _locks[_account];
    }

    function lastUnlockBlock(address _account) external view returns (uint256) {
        return _lastUnlockBlock[_account];
    }

    function lock(address _account, uint256 _amount) external onlyOwner {
        require(_account != address(0), "no lock to address(0)");
        require(_amount <= balanceOf(_account), "no lock over balance");

        _transfer(_account, address(this), _amount);

        _locks[_account] = _locks[_account].add(_amount);
        _totalLock = _totalLock.add(_amount);

        if (_lastUnlockBlock[_account] < startReleaseBlock) {
            _lastUnlockBlock[_account] = startReleaseBlock;
        }

        emit Lock(_account, _amount);
    }

    function canUnlockAmount(address _account) public view returns (uint256) {
        // When block number less than startReleaseBlock, no ALPACAs can be unlocked
        if (block.number < startReleaseBlock) {
            return 0;
        }
        // When block number more than endReleaseBlock, all locked ALPACAs can be unlocked
        else if (block.number >= endReleaseBlock) {
            return _locks[_account];
        }
        // When block number is more than startReleaseBlock but less than endReleaseBlock,
        // some ALPACAs can be released
        else
        {
            uint256 releasedBlock = block.number.sub(_lastUnlockBlock[_account]);
            uint256 blockLeft = endReleaseBlock.sub(_lastUnlockBlock[_account]);
            return _locks[_account].mul(releasedBlock).div(blockLeft);
        }
    }

    function unlock() external {
        require(_locks[msg.sender] > 0, "no locked");
        uint256 amount = canUnlockAmount(msg.sender);

        _transfer(address(this), msg.sender, amount);
        _locks[msg.sender] = _locks[msg.sender].sub(amount);
        _lastUnlockBlock[msg.sender] = block.number;
        _totalLock = _totalLock.sub(amount);
    }
}