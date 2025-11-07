# Exam Task 2: Liquidity & Trading

## Part A: Pool Price Calculation (20 points)

### Objective

Calculate the correct `_poolTick` value in `LiquidityCustodian.sol` to set the initial WETH price to approximately **$4000 USDC**.

### File Location

`packages/hardhat/contracts/LiquidityCustodian.sol` (Line 24)

### Requirements

1. Show your calculations in the next section and detail any assumptions and considerations.
   > It is easier to edit the file on your github account in your browser and commit the changes.
   > Remember to perform a `git pull origin main` when you start editing in your vscode solution.

### Calculation

For a price of 4000:

```
tick =
tick ≈
```

### Testing

Run `yarn test:local`, the following should pass:

- Should deploy LiquidityCustodian
- Should create Liquidity Pool
- Should mint Liquidity

## Part B: Swap Implementation (40 points)

### Objective

Implement the `swap()` function in `UniswapTrader.sol` to enable token swapping using Uniswap V3.

### File Location

`packages/hardhat/contracts/UniswapTrader.sol`

### Requirements

Implement the swap function by executing the `swapRouter.exactInputSingle(params)` method.

1. Implement any validation needed.
2. Implement any token transfers needed (between smart contract and sender).
3. Implement any token approvals for Uniswap Smart Contracts.
4. Set the deadline for 5 minutes.
5. Create Swap Parameters:
   ```solidity
   ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
       tokenIn: tokenIn,
       tokenOut: tokenOut,
       fee: poolFee,
       recipient: msg.sender,
       deadline: deadline,
       amountIn: amountIn,
       amountOutMinimum: amountOutMinimum,
       sqrtPriceLimitX96: 0
   });
   ```
6. Execute swap and any necessary events.

### Testing

Run `yarn test:local`, the following should pass:

- Should deploy UniswapTrader
- Should swap USDC for WETH
- Should swap WETH for USDC

## Points: 30

- Part A (Pool Price): 10 points
- Part B (Swap Implementation): 20 points
