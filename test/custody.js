const StandardToken = artifacts.require("./HumanStandardToken.sol");
const Custody = artifacts.require("./Custody.sol");

const expect = require("expect.js");

contract('deposit', function (accounts) {
  let token, custody;
  let user1 = accounts[1];

  before(async function () {
    custody = await Custody.deployed();
    console.log('custody', custody.address);
    token = await StandardToken.new(1000000, "some awesome token", 0, "SAT");
    await token.transfer(accounts[1], 10000);
    await custody.setToken(token.address);
  });

  it('user is able to send tokens to custody contract', async function () {
    console.log('custody', custody.address);
    await custody.delegateTokens(100, {from: user1});
    expect((await custody.tokens(user1)).toNumber()).to.eql(100);
    expect((await token.balanceOf(user1)).toNumber()).to.be.eql(9900);
  });
});
