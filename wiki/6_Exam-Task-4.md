# Exam Task 4: UI Demonstration Tasks

## Objective

Demonstrate your understanding of ERC20 tokens, Uniswap V3 liquidity pool creation, and trading functionality by interacting with the deployed smart contracts through the debug interface.

## File Location

Use the debug page at: `http://localhost:3000/debug`

## Requirements

### Prerequisites

1. **Start the local blockchain:**

   ```bash
   yarn chain
   ```

2. **Deploy contracts:**

   ```bash
   yarn deploy
   ```

3. **Start the frontend:**

   ```bash
   yarn start
   ```

4. **Navigate to debug page:**
   Open `http://localhost:3000/debug` in your browser

### Task 1: Wallet Connection and Account Setup (2 points)

1. **Connect MetaMask:**

   - Click "Connect Wallet" in the debug interface
   - Connect your MetaMask wallet
   - Ensure you're connected to the local Hardhat network (Chain ID: 31337)

2. **Import Hardhat Account 0:**
   - Use the default Hardhat account: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - Import this account into MetaMask if not already present

**📸 Take a screenshot showing:**

- Connected account address visible in the debug interface

---
<img src="" width="400">

---

### Task 2: Create Liquidity Pool (2 points)

1. **Navigate to LiquidityCustodian contract:**

   - Find the "LiquidityCustodian" contract in the debug interface
   - Use the `createPool()` function

2. **Create WETH9/USDC Pool:**
   - This will create a liquidity pool between WETH9 and your deployed USDC token
   - The pool will be initialized with the tick value you calculated in Task 2A
   - Verify the pool was created successfully

**📸 Take a screenshot showing:**

- The `createPool()` transaction confirmation

---
<img src="" width="400">

---

### Task 3: Buy WETH9 Tokens (1 point)

1. **Navigate to WETH9 contract:**

   - Find the "WETH9" contract in the debug interface
   - Use the `deposit()` function

2. **Buy 5 WETH:**
   - Send 5 ETH to the `deposit()` function
   - Value: 5 ETH
   - Verify your WETH9 balance increased by 5 tokens

**📸 Take a screenshot showing:**

- WETH9 balance after the deposit (should show 5 WETH)

---
<img src="" width="400">

---

### Task 4: Mint Liquidity Position (2 points)

1. **Navigate to LiquidityCustodian contract:**

   - Use the `mintLiquidity()` function

2. **Mint Position Parameters:**
   - Use the `_poolTick` value you calculated in Task 2A
   - Set appropriate liquidity amounts for both tokens
   - Ensure you have sufficient USDC and WETH9 balances
   - Mint the position and verify it was created successfully

**📸 Take a screenshot showing:**

- The `mintNewPosition()` transaction confirmation

---
<img src="" width="400">

---

### Task 5: Switch to Account 1 (1 point)

1. **Change MetaMask Account:**

   - Switch to Hardhat account 1: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Private key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
   - Import this account if not already present

2. **Verify Connection:**
   - Ensure the debug interface shows the new account address
   - Verify you're still connected to the local network

**📸 Take a screenshot showing:**

- Debug interface showing the new account address.

---
<img src="" width="400">

---

### Task 6: Buy WETH9 for Account 1 (1 point)

1. **Navigate to WETH9 contract:**

   - Use the `deposit()` function with Account 1

2. **Buy 10 WETH:**
   - Send 10 ETH to the `deposit()` function
   - Value: 10 ETH
   - Verify Account 1's WETH9 balance increased by 10 tokens

**📸 Take a screenshot showing:**

- WETH9 balance for Account 1 (should show 10 WETH)

---
<img src="" width="400">

---

### Task 7: Execute Token Swap (1 point)

1. **Navigate to UniswapTrader contract:**

   - Find the "UniswapTrader" contract in the debug interface
   - Use the `swap()` function

2. **Swap 1 WETH9 for USDC:**
   - `tokenIn`: WETH9 address (`0x5FbDB2315678afecb367f032d93F642f64180aa3`)
   - `tokenOut`: Your deployed USDC address
   - `amountIn`: 1 WETH.
   - `amountOutMinimum`: `0` (for testing purposes)
   - Execute the swap and record the amount of USDC received

**📸 Take a screenshot and paste in the space below:**

- Amount of USDC for Account 1.

---
<img src="" width="400">

---

### Task 8: Analysis and Explanation (5 Points)

**In one sentence or less, explain the following :**

1. **Why the USDC amount ≠ 4000:**

   - USDC received is not close to 4000 because...

## Submission Requirements

### Screenshot Guidelines:

- Copy and paste the screenshots in the spaces provided in this file.
  > NOTE: You can do this by editing this wiki file `6_Exam-Task-4.md` in your browser on github.

## Grading Criteria

| Task                       | Points | Criteria                                              |
| -------------------------- | ------ | ----------------------------------------------------- |
| Wallet Connection          | 2      | Successfully connected MetaMask and imported accounts |
| Pool Creation              | 2      | Pool created successfully with correct parameters     |
| WETH9 Purchase (Account 0) | 1      | 5 WETH purchased successfully                         |
| Liquidity Minting          | 2      | Position minted with calculated tick value            |
| Account Switch             | 1      | Successfully switched to Account 1                    |
| WETH9 Purchase (Account 1) | 2      | 10 WETH purchased successfully                        |
| Token Swap                 | 3      | 1 WETH swapped for USDC                               |
| Explanation                | 2      |                                                       |
| **Total**                  | **15** |                                                       |

## Troubleshooting

### Common Issues:

1. **"Insufficient funds" error:**

   - Ensure you have enough ETH in your account
   - Check that you're on the correct network

2. **"Pool not found" error:**

   - Verify the pool was created successfully
   - Check that you're using the correct token addresses

3. **"Swap failed" error:**
   - Ensure you have sufficient token balances
   - Check that the pool has liquidity
   - Verify token approval if needed

### Need Help?

- Check the browser console for detailed error messages
- Verify all contracts are deployed correctly
- Ensure the local blockchain is running

## Points: 15
