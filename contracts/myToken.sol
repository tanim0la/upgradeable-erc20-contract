// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract GLDToken is Initializable,ERC20Upgradeable,UUPSUpgradeable,OwnableUpgradeable{
    function  initialize() public initializer {
        __ERC20_init("Gold", "GLD");
        __Ownable_init();

        _mint(address(this), 1000*1e18);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

contract GLDTokenV2 is GLDToken {
    function burn(uint amount) public onlyOwner {
        _burn(address(this), amount*1e18);
    }
}