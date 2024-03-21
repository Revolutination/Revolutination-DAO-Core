const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DAO', function () {
  it('Should create a DAO', async function () {
    const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy();

    await dao.deployed();
    expect(await dao.name()).to.equal('My DAO');
    expect(await dao.symbol()).to.equal('DAO');
  });

  it('Should create a token', async function () {
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();

    await token.deployed();
    expect(await token.name()).to.equal('My Token');
    expect(await token.symbol()).to.equal('TKN');
  });

  it('Should create a voting contract', async function () {
    const Voting = await ethers.getContractFactory('Voting');
    const voting = await Voting.deploy();

    await voting.deployed();
    expect(await voting.name()).to.equal('My Voting');
  });

  it('Should allow a user to join the DAO', async function () {
    const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy();

    await dao.deployed();
    const [owner] = await ethers.getSigners();

    await dao.connect(owner).join('User1');
    expect(await dao.members(0)).to.equal('User1');
  });

  it('Should allow a user to create a proposal', async function () {
    const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy();

    await dao.deployed();
    const [owner] = await ethers.getSigners();

    await dao.connect(owner).join('User1');
    awaitdao.connect(owner).createProposal('Test Proposal', 100, true);

    const proposal = await dao.proposals(0);
    expect(proposal.description).to.equal('Test Proposal');
    expect(proposal.amount).to.equal(100);
    expect(proposal.executed).to.equal(false);
  });

  it('Should allow a user to vote on a proposal', async function () {
    const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy();

    await dao.deployed();
    const [owner, addr1] = await ethers.getSigners();

    await dao.connect(owner).join('User1');
    await dao.connect(addr1).join('User2');

    await dao.connect(owner).createProposal('Test Proposal', 100, true);
    await dao.connect(addr1).vote(0, 1);

    const proposal = await dao.proposals(0);
    expect(proposal.votesFor).to.equal(1);
  });

  it('Should allow a user to execute a proposal', async function () {
    const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy();

    await dao.deployed();
    const [owner, addr1] = await ethers.getSigners();

    await dao.connect(owner).join('User1');
    await dao.connect(addr1).join('User2');

    await dao.connect(owner).createProposal('Test Proposal', 100, true);
    await dao.connect(addr1).vote(0, 1);

    await dao.connect(owner).executeProposal(0);

    const proposal = await dao.proposals(0);
    expect(proposal.executed).to.equal(true);
  });

  it('Should not allow a user to execute a proposal if it has not been voted on', async function () {
   const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy();

    await dao.deployed();
    const [owner] = await ethers.getSigners();

    await dao.connect(owner).createProposal('Test Proposal', 100, true);

    await expect(dao.connect(owner).executeProposal(0)).to.be.revertedWith('Cannot execute a proposal without votes');
  });
});
