const { deploy } = require('@openzeppelin/truffle-deployer');
const { ethers } = require('ethers');

const FormalVerifier = artifacts.require('FormalVerifier');
const SecurityAnalysis = artifacts.require('SecurityAnalysis');

module.exports = async function (deployer, network, accounts) {
  // Set up the deployment configuration
  const gasPrice = ethers.utils.parseUnits('20', 'gwei');
  const gasLimit = 8000000;

  // Deploy the Formal Verifier contract
  await deployer.deploy(FormalVerifier, {
    from: accounts[0],
    gas: gasLimit,
    gasPrice: gasPrice,
  });

  // Deploy the Security Analysis contract
  await deployer.deploy(SecurityAnalysis, {
    from: accounts[0],
    gas: gasLimit,
    gasPrice: gasPrice,
  });

  // Set up the contract addresses
  const formalVerifierAddress = FormalVerifier.address;
  const securityAnalysisAddress = SecurityAnalysis.address;

  // Set up the contract instances
  const formalVerifier = await FormalVerifier.at(formalVerifierAddress);
  const securityAnalysis = await SecurityAnalysis.at(securityAnalysisAddress);

  // Configure the contracts
  await formalVerifier.setSecurityAnalysisContract(securityAnalysisAddress);
  await securityAnalysis.setFormalVerifierContract(formalVerifierAddress);

  // Verify the contracts
  await formalVerifier.verifyContract(securityAnalysisAddress);
  await securityAnalysis.analyzeContract(formalVerifierAddress);

  // Log the deployment results
  console.log(`Formal Verifier contract deployed to ${formalVerifierAddress}`);
  console.log(`Security Analysis contract deployed to ${securityAnalysisAddress}`);
};
