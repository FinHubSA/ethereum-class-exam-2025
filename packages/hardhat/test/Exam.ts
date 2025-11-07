/* eslint-disable @typescript-eslint/no-unused-vars */

import hre from "hardhat";
import { expect } from "chai";
import {
  LiquidityCustodian,
  UniswapTrader,
  IERC20,
  IWETH9,
  IUniswapV3Pool,
  INonfungiblePositionManager,
  ISwapRouter,
} from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { EventLog } from "ethers";

const { ethers } = hre;

describe("🚩 Uniswap Dex: 🏵 Liquidity Custodian 🤖", function () {
  const factoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  let swapRouter: ISwapRouter;
  const swapRouterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  let positionManager: INonfungiblePositionManager;
  const positionManagerAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  let WETHToken: IWETH9;
  const WETHTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  let liquidityPoolAddress: string;
  let liquidityPool: IUniswapV3Pool;

  let USDCToken: IERC20;
  let USDCTokenAddress = "";

  let liquidityCustodian: LiquidityCustodian;
  let liquidityCustodianAddress = "";

  let uniswapTrader: UniswapTrader;
  let uniswapTraderAddress = "";

  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let user3: HardhatEthersSigner;

  before(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();

    WETHToken = (await ethers.getContractAtWithSignerAddress(
      "IWETH9",
      WETHTokenAddress,
      owner.address,
    )) as unknown as IWETH9;

    positionManager = (await ethers.getContractAtWithSignerAddress(
      "INonfungiblePositionManager",
      positionManagerAddress,
      owner.address,
    )) as unknown as INonfungiblePositionManager;

    swapRouter = (await ethers.getContractAtWithSignerAddress(
      "ISwapRouter",
      swapRouterAddress,
      owner.address,
    )) as unknown as ISwapRouter;
  });

  it("Should deploy USDCoin", async function () {
    const USDCoinFactory = await ethers.getContractFactory("USDCoin");

    USDCToken = (await USDCoinFactory.deploy()) as IERC20;
    USDCTokenAddress = await USDCToken.getAddress();
  });

  it("Should deploy LiquidityCustodian", async function () {
    const LiquidityCustodianFactory = await ethers.getContractFactory("LiquidityCustodian");

    liquidityCustodian = (await LiquidityCustodianFactory.deploy(
      factoryAddress,
      positionManagerAddress,
      USDCTokenAddress,
      WETHTokenAddress,
    )) as LiquidityCustodian;

    await liquidityCustodian.waitForDeployment();
    liquidityCustodianAddress = await liquidityCustodian.getAddress();
  });

  it("Should create Liquidity Pool", async function () {
    const txn = await liquidityCustodian.connect(owner).createPool();

    const receipt = await txn.wait();

    const poolEventLog = receipt!.logs.find(l => {
      const eventLog = l as EventLog;
      return eventLog.fragment && eventLog.fragment.name === "PoolCreated";
    }) as EventLog;
    const iface = new ethers.Interface(["event PoolCreated(address tk, address pool, uint160 sqrtPriceX96)"]);
    const decodedLog = iface.decodeEventLog("PoolCreated", poolEventLog.data, poolEventLog.topics);

    liquidityPoolAddress = decodedLog.pool as string;
    liquidityPool = (await ethers.getContractAtWithSignerAddress(
      "IUniswapV3Pool",
      liquidityPoolAddress,
      owner.address,
    )) as unknown as IUniswapV3Pool;
  });

  it("Should mint Liquidity", async function () {
    const depositWethTxn = await WETHToken.connect(owner).deposit({ value: ethers.parseUnits("1000", "ether") });
    console.log("\t", "Deposit WETH for owner result", depositWethTxn.hash);

    console.log("\t", "Waiting for deposit confirmation...");
    const depositWethTxResult = await depositWethTxn.wait();
    expect(depositWethTxResult?.status).to.equal(1, "Error when expecting the deposit transaction result to be 1");

    const tokenAmount = await USDCToken.connect(owner).balanceOf(owner.address);
    expect(tokenAmount).to.equal(ethers.parseUnits("1000000000", "ether"));
    console.log("\t", `Owner has ${tokenAmount} USDC tokens`);

    const wethAmount = await WETHToken.connect(owner).balanceOf(owner.address);
    expect(wethAmount).to.greaterThanOrEqual(ethers.parseUnits("1000", "ether"));
    console.log("\t", `Owner has ${wethAmount} WETH tokens`);

    const approveWETHTxn = await WETHToken.connect(owner).approve(
      liquidityCustodianAddress,
      ethers.parseUnits("1000", "ether"),
    );
    console.log("\t", "Approve liquidity custodian for 10 WETH tokens", depositWethTxn.hash);

    console.log("\t", "Waiting for approval confirmation...");
    const approveWETHTxResult = await approveWETHTxn.wait();
    expect(approveWETHTxResult?.status).to.equal(1, "Error when expecting the approval transaction result to be 1");

    const approveUSDCTxn = await USDCToken.connect(owner).approve(
      liquidityCustodianAddress,
      ethers.parseUnits("1000", "ether"),
    );
    console.log("\t", "Approve liquidity custodian for 1000 USDC tokens", approveUSDCTxn.hash);

    console.log("\t", "Waiting for approval confirmation...");
    const approveUSDCTxResult = await approveUSDCTxn.wait();
    expect(approveUSDCTxResult?.status).to.equal(1, "Error when expecting the approval transaction result to be 1");

    console.log("\t", "Minting liquidity position...");
    const mintPositionTxn = await liquidityCustodian
      .connect(owner)
      .mintNewPosition(ethers.parseUnits("1000", "ether"), ethers.parseUnits("1000", "ether"));

    console.log("\t", "Waiting for minting confirmation...");
    const mintPositionTxnResult = await mintPositionTxn.wait();
    expect(mintPositionTxnResult?.status).to.equal(1, "Error when expecting the minting transaction result to be 1");

    console.log("\t", "Getting liquidity tokenId...");
    const tokenId = await liquidityCustodian.liquidityTokenByIndex(owner.address, 0);
    console.log("\t", `Liquidity tokenId: ${tokenId}`);

    const position = await positionManager.connect(owner).positions(tokenId);

    expect(position.token0).to.equal(WETHTokenAddress < USDCTokenAddress ? WETHTokenAddress : USDCTokenAddress);
    expect(position.token1).to.equal(WETHTokenAddress < USDCTokenAddress ? USDCTokenAddress : WETHTokenAddress);
    expect(position.fee).to.equal(10000);
  });

  it("Should deploy UniswapTrader", async function () {
    const UniswapTraderFactory = await ethers.getContractFactory("UniswapTrader");

    uniswapTrader = (await UniswapTraderFactory.deploy(
      swapRouterAddress,
      USDCTokenAddress,
      WETHTokenAddress,
    )) as UniswapTrader;

    await uniswapTrader.waitForDeployment();
    uniswapTraderAddress = await uniswapTrader.getAddress();

    console.log("\t", `UniswapTrader deployed at: ${uniswapTraderAddress}`);

    expect(await uniswapTrader.usdc()).to.equal(USDCTokenAddress);
    expect(await uniswapTrader.weth()).to.equal(WETHTokenAddress);
    expect(await uniswapTrader.swapRouter()).to.equal(swapRouterAddress);
  });

  it("Should swap USDC for WETH", async function () {
    const usdcAmountIn = ethers.parseUnits("100", "ether");
    const minWethOut = ethers.parseUnits("0.01", "ether");

    const usdcBalanceBefore = await USDCToken.balanceOf(owner.address);
    const wethBalanceBefore = await WETHToken.balanceOf(owner.address);

    console.log("\t", `USDC balance before: ${ethers.formatUnits(usdcBalanceBefore, 18)}`);
    console.log("\t", `WETH balance before: ${ethers.formatUnits(wethBalanceBefore, 18)}`);

    const approveUSDCTxn = await USDCToken.connect(owner).approve(uniswapTraderAddress, usdcAmountIn);
    console.log("\t", "Approve UniswapTrader for USDC tokens", approveUSDCTxn.hash);

    const approveUSDCTxResult = await approveUSDCTxn.wait();
    expect(approveUSDCTxResult?.status).to.equal(1, "Error when expecting the approval transaction result to be 1");

    console.log("\t", "Swapping USDC for WETH...");
    const swapTxn = await uniswapTrader
      .connect(owner)
      .swap(USDCTokenAddress, WETHTokenAddress, usdcAmountIn, minWethOut);

    console.log("\t", "Waiting for swap confirmation...");
    const swapTxnResult = await swapTxn.wait();
    expect(swapTxnResult?.status).to.equal(1, "Error when expecting the swap transaction result to be 1");

    const usdcBalanceAfter = await USDCToken.balanceOf(owner.address);
    const wethBalanceAfter = await WETHToken.balanceOf(owner.address);

    console.log("\t", `USDC balance after: ${ethers.formatUnits(usdcBalanceAfter, 18)}`);
    console.log("\t", `WETH balance after: ${ethers.formatUnits(wethBalanceAfter, 18)}`);

    expect(usdcBalanceAfter).to.equal(usdcBalanceBefore - usdcAmountIn);

    const wethReceived = wethBalanceAfter - wethBalanceBefore;
    expect(wethReceived).to.be.greaterThanOrEqual(minWethOut);
    console.log("\t", `WETH received: ${ethers.formatUnits(wethReceived, 18)}`);

    const swapEventLog = swapTxnResult!.logs.find(l => {
      const eventLog = l as EventLog;
      return eventLog.fragment && eventLog.fragment.name === "TokensSwapped";
    });

    expect(swapEventLog !== undefined).to.equal(true);
    console.log("\t", "✅ TokensSwapped event emitted successfully");
  });

  it("Should swap WETH for USDC", async function () {
    const wethAmountIn = ethers.parseUnits("50", "ether");
    const minUsdcOut = ethers.parseUnits("1", "ether");

    const usdcBalanceBefore = await USDCToken.balanceOf(owner.address);
    const wethBalanceBefore = await WETHToken.balanceOf(owner.address);

    console.log("\t", `USDC balance before: ${ethers.formatUnits(usdcBalanceBefore, 18)}`);
    console.log("\t", `WETH balance before: ${ethers.formatUnits(wethBalanceBefore, 18)}`);

    const approveWETHTxn = await WETHToken.connect(owner).approve(uniswapTraderAddress, wethAmountIn);
    console.log("\t", "Approve UniswapTrader for WETH tokens", approveWETHTxn.hash);

    const approveWETHTxResult = await approveWETHTxn.wait();
    expect(approveWETHTxResult?.status).to.equal(1, "Error when expecting the approval transaction result to be 1");

    console.log("\t", "Swapping WETH for USDC...");
    const swapTxn = await uniswapTrader
      .connect(owner)
      .swap(WETHTokenAddress, USDCTokenAddress, wethAmountIn, minUsdcOut);

    console.log("\t", "Waiting for swap confirmation...");
    const swapTxnResult = await swapTxn.wait();
    expect(swapTxnResult?.status).to.equal(1, "Error when expecting the swap transaction result to be 1");

    const usdcBalanceAfter = await USDCToken.balanceOf(owner.address);
    const wethBalanceAfter = await WETHToken.balanceOf(owner.address);

    console.log("\t", `USDC balance after: ${ethers.formatUnits(usdcBalanceAfter, 18)}`);
    console.log("\t", `WETH balance after: ${ethers.formatUnits(wethBalanceAfter, 18)}`);

    expect(wethBalanceAfter).to.equal(wethBalanceBefore - wethAmountIn);

    const usdcReceived = usdcBalanceAfter - usdcBalanceBefore;
    expect(usdcReceived).to.be.greaterThanOrEqual(minUsdcOut);
    console.log("\t", `USDC received: ${ethers.formatUnits(usdcReceived, 18)}`);

    const swapEventLog = swapTxnResult!.logs.find(l => {
      const eventLog = l as EventLog;
      return eventLog.fragment && eventLog.fragment.name === "TokensSwapped";
    });

    expect(swapEventLog !== undefined).to.equal(true);
    console.log("\t", "✅ TokensSwapped event emitted successfully");
  });

  it("Should reject invalid token pair swap", async function () {
    const invalidTokenAddress = "0x0000000000000000000000000000000000000001";
    const amount = ethers.parseUnits("1", "ether");

    await expect(
      uniswapTrader.connect(owner).swap(invalidTokenAddress, USDCTokenAddress, amount, 0),
    ).to.be.revertedWith("Invalid token pair: must swap between USDC and WETH");

    console.log("\t", "✅ Invalid token pair correctly rejected");
  });

  it("Should reject zero amount swap", async function () {
    const zeroAmount = 0;

    await expect(
      uniswapTrader.connect(owner).swap(USDCTokenAddress, WETHTokenAddress, zeroAmount, 0),
    ).to.be.revertedWith("Amount must be greater than 0");

    console.log("\t", "✅ Zero amount correctly rejected");
  });
});
