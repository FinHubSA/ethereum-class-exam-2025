# Exam Task 3: Deployment Script

## Objective

Complete the deployment script to deploy all three contracts: USDCoin, LiquidityCustodian, and UniswapTrader.

## File Location

`packages/hardhat/deploy/00_deploy_contracts.ts`

## Requirements

### Available Variables

The script provides these pre-configured addresses:

> NOTE: These are uniswap V3 smart contracts, that are deployed using the `hardhat-v3-deploy` project.

```typescript
const uniswapV3FactoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const uniswapV3PositionManagerAddress =
  "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const uniswapV3RouterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const WETHTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
```

### Task 1: Deploy USDCoin

**Requirements:**

- Contract name: `"USDCoin"`
- Store result in variable: `usdCoinDeployment`

**Example pattern:**

```typescript
const contractDeployment = await deploy("ContractName", {
  from: deployer,
  args: [arg1, arg2, ...],
  log: true,
  autoMine: true,
});
```

### Task 2: Deploy LiquidityCustodian

**Requirements:**

- Contract name: `"LiquidityCustodian"`
- Store result in variable: `liquidityCustodianDeployment`

### Task 3: Deploy UniswapTrader

**Requirements:**

- Contract name: `"UniswapTrader"`
- Store result in variable: `uniswapTraderDeployment`

### Testing

Run the deployment:

```bash
yarn deploy
```

## Common Errors

### "Constructor arguments mismatch"

- Check the number and order of arguments
- Verify you're using the correct variable names

### "Contract not found"

- Make sure the contract name matches exactly
- Ensure contracts have been compiled: `yarn compile`

### "Deployment failed"

- Check that `yarn chain` is running
- Verify all contracts are implemented (no empty TODOs)

## Points: 10
