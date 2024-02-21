// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Uniswap.sol";

contract TestUniswap {
  address private constant UNISWAP_V2_ROUTER =
    0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  uint private constant EXCHANGE_RATE = 75 * 10**16; // Considering 18 decimal places for tokens // Considering 18 decimal places for tokens

  function swap(
    address _tokenIn,
    address _tokenOut,
    uint _amountIn,
    address _to
  ) external {
    require(_tokenIn != _tokenOut, "TokenIn and TokenOut must be different");

    IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn);

    address[] memory path;
    if (_tokenIn == WETH || _tokenOut == WETH) {
      path = new address[](2);
      path[0] = _tokenIn;
      path[1] = _tokenOut;
    } else {
      path = new address[](3);
      path[0] = _tokenIn;
      path[1] = WETH;
      path[2] = _tokenOut;
    }

    uint amountOut = (_amountIn * EXCHANGE_RATE)  / (10**18); // Considering 18 decimal places for tokens

      IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
      amountOut, // Using the fixed exchange rate
      0, // No minimum output required
      path,
      _to,
      block.timestamp
    );
  }
}
