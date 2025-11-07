# Exam Task 1: USDCoin Implementation

## Objective

Implement a fungible ERC20 token called **USDCoin** that will be used as a stablecoin in the Uniswap V3 DEX.

## File Location

`packages/hardhat/contracts/USDCoin.sol`

## Requirements

### 1. Token Specifications

Create an ERC20 token with the following properties:

- **Name:** "USDCoin"
- **Symbol:** "USDC"
- **Total Supply:** 1,000,000,000 (1 billion) tokens

### 3. Expected Behavior

After implementation:

- The deployer should receive 1 billion USDC tokens
- Token should be transferable and follow ERC20 standard

### Testing

Run `yarn test:local`, the following should pass:

- Should deploy USDCoin

## Points: 10
