const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const User = await hre.ethers.getContractFactory("User");
  const user = await User.deploy();
  await user.waitForDeployment();
  const userAddress = await user.getAddress();
  console.log("User contract deployed to:", userAddress);

  console.log("\nOne Hand — deployment done.");
  console.log("Set in frontend .env: VITE_USER_CONTRACT_ADDRESS=" + userAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
