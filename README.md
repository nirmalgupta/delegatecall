### Testing delegate call in solidity.

## Pre-requisite
```bash
node 8.4.0
truffle 3.4.5
```

## steps
```bash
$ npm install
$ npm test
```

## Result of test
```bash
> node test.js

Compiling ./contracts/Custody.sol...
Compiling ./contracts/Migrations.sol...
Compiling tokens/HumanStandardToken.sol...
Compiling tokens/StandardToken.sol...
Compiling tokens/Token.sol...

  Contract: deposit
    1) user is able to send tokens to custody contract
    Events emitted during test:
    ---------------------------

    Transfer(_from: <indexed>, _to: <indexed>, _value: 100)

    ---------------------------

  0 passing (290ms)
  1 failing

  1) Contract: deposit user is able to send tokens to custody contract:

      Error: expected 0 to sort of equal 100
      + expected - actual

      -0
      +100
      
      at Assertion.assert (node_modules/expect.js/index.js:96:13)
      at Assertion.eql (node_modules/expect.js/index.js:230:10)
      at Context.<anonymous> (test/custody.js:21:57)
      at <anonymous>
      at process._tickCallback (internal/process/next_tick.js:188:7)



npm ERR! Test failed.  See above for more details.

```

## Scenario:
I am trying to make use of `delegatecall` function in solidity. File name `Custody.sol` 
```solidity
    function delegateTokens(uint256 _value) returns (bool result) {
        tokens[msg.sender] = _value;
        return token.delegatecall(bytes4(sha3("transfer(address,uint256)")), address(this), _value);
    }
```

There is no error thrown but values are not changed. 


