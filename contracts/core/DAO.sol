pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DAO is Ownable {
    using SafeMath for uint256;

    IERC20 public token;
    uint256 public proposalCount;

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 amount;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        mapping(address => bool) voted;
    }

    Proposal[] public proposals;

    event ProposalCreated(
        uint256 indexed id,
        address indexed proposer,
        string description,
        uint256 amount
    );

    event Voted(uint256 indexed id, bool support, address indexed voter);

    constructor(IERC20 _token) {
        token = _token;
    }

    function createProposal(string memory _description, uint256 _amount) public {
        proposals.push(Proposal(proposalCount, msg.sender, _description, _amount, 0, 0, false));
        emit ProposalCreated(proposalCount, msg.sender, _description, _amount);
        proposalCount++;
    }

    function vote(uint256 _proposalId, bool _support) public {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voted[msg.sender], "Already voted");

        uint256 votes = token.balanceOf(msg.sender);
        require(votes > 0, "No tokens to vote with");

        if (_support) {
            proposal.votesFor += votes;
        } else {
            proposal.votesAgainst += votes;
        }

        proposal.voted[msg.sender] = true;

        emit Voted(_proposalId, _support, msg.sender);
    }

    function execute(uint256 _proposalId) public onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.votesFor > proposal.votesAgainst, "Proposal not executed");
        require(!proposal.executed, "Proposal already executed");

        token.transferFrom(msg.sender, address(this), proposal.amount);

        proposal.executed = true;
    }
}
