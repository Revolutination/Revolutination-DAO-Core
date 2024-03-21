pragma solidity ^0.8.0;
import "./Token.sol";
import "@openzeppelin/contracts/test/utils/BaseTest.sol";

contract TokenTest is BaseTest {
    Token private token;

    function setUp() public {
        token = new Token("Test Token", "TST");
    }

    function testTotalSupply() public {
        assertEq(token.totalSupply(), 0);
    }

    function testBalanceOf() public {
        assertEq(token.balanceOf(address(this)), 0);
    }

    function testTransfer() public {
        address recipient = address(1);
        token.mint(address(this), 1000);
        token.transfer(recipient, 100);
        assertEq(token.balanceOf(address(this)), 900);
        assertEq(token.balanceOf(recipient), 100);
    }

    function testApprove() public {
        address spender = address(1);
        token.mint(address(this), 1000);
        token.approve(spender, 100);
        assertEq(token.allowance(address(this), spender), 100);
    }

    function testTransferFrom() public {
        address owner = address(this);
        address recipient = address(1);
        address spender = address(2);
        token.mint(owner, 1000);
        token.approve(spender, 100);
        token.transferFrom(owner, recipient, 50);
        assertEq(token.balanceOf(owner), 950);
        assertEq(token.balanceOf(recipient), 50);
        assertEq(token.allowance(owner, spender), 50);
    }
}
