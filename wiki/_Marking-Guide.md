# Marking Guide

## Total Points: 60

## Breakdown

### Task 1: USDCoin Implementation (5 points)

**File:** `packages/hardhat/contracts/USDCoin.sol`

| Criteria                                      | Points |
| --------------------------------------------- | ------ |
| Correct total supply calculation              | 1      |
| Proper use of `_mint()` function              | 1      |
| Tokens minted to correct address (msg.sender) | 1      |
| Contract compiles without errors              | 2      |

**Test Verification:**

```typescript
it("Should deploy USDCoin");
```

---

### Task 2A: Pool Price Calculation (10 points)

**File:** `packages/hardhat/contracts/LiquidityCustodian.sol`

| Criteria                                  | Points |
| ----------------------------------------- | ------ |
| Correct tick calculation for ~$4000 price | 5      |
| Understanding of token ordering           | 3      |
| Pool initializes successfully             | 1      |
| Price is closest to $4000                 | 1      |

**Test Verification:**

```typescript
it("Should create Liquidity Pool");
it("Should mint Liquidity");
```

---

### Task 2B: Swap Implementation (20 points)

**File:** `packages/hardhat/contracts/UniswapTrader.sol`

| Criteria                                        | Points |
| ----------------------------------------------- | ------ |
| Validation                                      | 3      |
| Correct transfers                               | 3      |
| Deadline calculation                            | 3      |
| Proper `ExactInputSingleParams` struct creation | 3      |
| Successful swap execution                       | 3      |
| Events and return                               | 5      |

**Test Verification:**

```typescript
it("Should swap USDC for WETH");
it("Should swap WETH for USDC");
it("Should reject invalid token pair swap");
it("Should reject zero amount swap");
```

---

### Task 3: Deployment Script (10 points)

**File:** `packages/hardhat/deploy/00_deploy_contracts.ts`

| Criteria                                        | Points |
| ----------------------------------------------- | ------ |
| USDCoin deployment                              | 3      |
| LiquidityCustodian deployment with correct args | 3      |
| UniswapTrader deployment with correct args      | 4      |

**Test Verification:**

- All deployment tests pass
- Contracts are accessible in tests
- Correct constructor arguments used

---

### Task 4: UI Demonstration (15 points)

**File:** UI demonstration via debug interface at `http://localhost:3000/debug`

| Criteria                                    | Points |
| ------------------------------------------- | ------ |
| MetaMask connection and account import      | 2      |
| Liquidity pool creation via debug interface | 1      |
| WETH9 purchase (Account 0)                  | 1      |
| Liquidity position minting                  | 1      |
| Account switching to Account 1              | 2      |
| WETH9 purchase (Account 1)                  | 1      |
| Token swap execution                        | 2      |
| Written explanation                         | 5      |

**Verification:**

- Screenshots of successful transactions
- Proper use of debug interface
- Correct account management
- Understanding of swap mechanics

---

## Grading Criteria

### Compilation (Required)

- All contracts must compile without errors

### Tests (Required)

- Use the tests to check for correctness

## Time Management

Recommended time allocation:

- USDCoin implementation: 15 minutes
- Pool price calculation: 30 minutes
- Swap implementation: 60 minutes
- Deployment script: 30 minutes
- UI demonstration: 60 minutes
- Testing & debugging: 45 minutes

**Total: 3 hours**

## Getting Help During Exam

You may:

- ✅ Reference documentation (Uniswap, OpenZeppelin, Solidity)
- ✅ Use online calculators for tick/price conversion
- ✅ Check Scaffold-ETH documentation
- ✅ Review error messages and stack traces

You may NOT:

- ❌ Copy code from other students
- ❌ Use AI assistants (ChatGPT, Copilot, etc.)
- ❌ Share solutions with classmates
- ❌ Access solutions from previous years

Good luck! 🍀
