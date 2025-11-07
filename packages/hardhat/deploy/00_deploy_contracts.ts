/* eslint-disable @typescript-eslint/no-unused-vars */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const uniswapV3FactoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const uniswapV3PositionManagerAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const uniswapV3RouterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const WETHTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // TODO: Deploy the USDCoin token contract

  // TODO: Deploy the LiquidityCustodian contract

  // TODO: Deploy the UniswapTrader contract
};

export default deployContracts;

deployContracts.tags = ["Contracts"];
