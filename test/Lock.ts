import { ethers } from 'ethers';
import { expect } from 'chai';

// Import the contract artifacts
import TestUniswap from 'artifacts\contracts\SwapTokens.sol\TestUniswap.json';


describe('TestUniswap Contract', function () {
  let testUniswap: any;

  beforeEach(async () => {
    // Deploy the contract
    const TestUniswapFactory = new ethers.ContractFactory(
      TestUniswap.abi,
      TestUniswap.bytecode
    );

    testUniswap = await TestUniswapFactory.deploy();
    await testUniswap.deployed();
  });

  it('should swap tokens successfully', async function () {
    // Define sample inputs
    const tokenIn = '0x...'; // Address of token to swap
    const tokenOut = '0x...'; // Address of token desired in return
    //const amountIn = ethers.utils.parseUnits('100', 18); // Amount of tokenIn (100 tokens, considering 18 decimals)
    const recipient = '0x...'; // Address to receive swapped tokens

    // Perform the token swap
    await testUniswap.swap(tokenIn, tokenOut, recipient);

    // Assert the state or emit an event to check if the swap was successful
    // Add your assertions here based on the contract's behavior
  });
});
