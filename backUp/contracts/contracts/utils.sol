// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

contract Utils {

    // Function to compare two unix timestamps and determine the recent date
    function isRecentDate(uint firstDate, uint secondDate) public pure returns(bool) {
        return firstDate > secondDate;
    }

    // Function to compare the equality of two strings firstStr & scondStr
    function isEqual(string memory firstStr, string memory secondStr) public pure returns(bool) {
        return keccak256(abi.encodePacked(firstStr)) == keccak256(abi.encodePacked(secondStr));
    }

}
