// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract aller {
    function store() public {
        uint256 newValue = uint256(
            keccak256(
                abi.encodePacked(
                    "0x769a00b6ef2c67bccdc5a5c4844ce2223233928d",
                    "5280",
                    "19935301"
                )
            )
        ) % 1000000;
        assembly {
            sstore(777, newValue)
        }
    }

    function regarder() public view returns (uint256) {
        uint256 value;
        assembly {
            value := sload(777)
        }
        return value;
    }
}
