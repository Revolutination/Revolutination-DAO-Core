const Migrations = artifacts.require("./Migrations.sol");
const Storage = artifacts.require("./Storage.sol");
const Token = artifacts.require("./Token.sol");
const Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Storage);
  deployer.deploy(Token);
  deployer.deploy(Voting);
};
