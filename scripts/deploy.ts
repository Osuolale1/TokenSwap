import { ethers } from 'ethers';

// Import the contract artifacts
import TestUniswapArtifact from '../artifacts/contracts/SwapTokens.sol/TestUniswap.json';
import FEMIArtifact from '../artifacts/contracts/FEM.sol/FEMI.json';

// import TokenArtifact from './artifacts/contracts/YourToken.sol/YourToken.json';

async function main() {
  // Connect to the local Ethereum network using ethers.js
  const provider = new ethers.providers.JsonRpcProvider(); // Connect to the default JSON-RPC provider (localhost:8545)

  // Define the signer (account) for deploying contracts
  const signer = new ethers.Wallet('<YOUR_PRIVATE_KEY>', provider); // Replace <YOUR_PRIVATE_KEY> with your private key

  // Deploy the TestUniswap contract
  const TestUniswapFactory = new ethers.ContractFactory(
    TestUniswapArtifact.abi,
    TestUniswapArtifact.bytecode,
    signer
  );
  const testUniswap = await TestUniswapFactory.deploy();
  await testUniswap.deployed();
  console.log('TestUniswap contract deployed to:', testUniswap.address);

  // Deploy a sample ERC20 token if needed
  // const TokenFactory = new ethers.ContractFactory(
  //   TokenArtifact.abi,
  //   TokenArtifact.bytecode,
  //   signer
  // );
  // const token = await TokenFactory.deploy();
  // await token.deployed();
  // console.log('Sample ERC20 token deployed to:', token.address);
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
