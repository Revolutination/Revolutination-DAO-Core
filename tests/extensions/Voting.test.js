pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voting.sol";

contract TestVoting {
    Voting voting;
    address[] memory voters;
    uint256[] memory proposals;

    function beforeEach() public {
        voting = new Voting(voters);
        proposals = [0, 1, 2];
    }

    function testProposalCount() public {
        Assert.equal(voting.proposalCount(), proposals.length, "Proposal count should be equal to the number of proposals");
    }

    function testVote() public {
        uint256 proposalId = 0;
        uint256 voterId = 0;
        uint256 weight = 1;
        voting.vote(proposalId, voterId, weight);
        Assert.equal(voting.getVotes(proposalId), weight, "Vote should be recorded correctly");
    }

    function testWinner() public {
        uint256 proposalId = 0;
        uint256 voterId = 0;
        uint256 weight = 1;
        voting.vote(proposalId, voterId, weight);
        Assert.equal(voting.winner(), proposalId, "Winner should be the proposal with the most votes");
    }
          }
