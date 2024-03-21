const Migrations = artifacts.require("./Migrations.sol");
const Storage = artifacts.require("./Storage.sol");
const Token = artifacts.require("./Token.sol");
const Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.link(Storage, [Token, Voting]);
  deployer.deploy(Token);
  deployer.deploy(Voting);
};
