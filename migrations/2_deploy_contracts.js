const Custody = artifacts.require("./Custody.sol");

module.exports = function(deployer) {
  deployer.deploy(Custody, "0xa2ed424d3588e5c10988a30b8a9d5085d1608b69");
};
