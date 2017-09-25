pragma solidity ^0.4.11;


import "tokens/HumanStandardToken.sol";


contract Custody {
    address public owner;

    mapping (address => uint256) public tokens;

    HumanStandardToken public token;

    address public tokenId;

    function Custody(address _owner){
        owner = _owner;
    }

    function setToken(address _tokenId) {
        require(msg.sender == owner);
        tokenId = _tokenId;
        token = HumanStandardToken(_tokenId);
    }

    function delegateTokens(uint256 _value) returns (bool result) {
        tokens[msg.sender] = _value;
        return token.delegatecall(bytes4(sha3("transfer(address,uint256)")), address(this), _value);
    }
}