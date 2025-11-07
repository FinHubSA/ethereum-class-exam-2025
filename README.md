# Ethereum Class Practical Exam 2025

Welcome to the Fintech and Cryptocurrencies Practical Exam! This exam tests your knowledge of **ERC20 tokens** and **Decentralized Exchanges (DEXs)** using Uniswap V3.

## 📋 Exam Overview

This is a **3-hour practical exam** where you will demonstrate your understanding of blockchain development by implementing smart contracts and interacting with decentralized protocols.

### Total Points: **60**

### Exam Format:

- **Duration:** 3 hours
- **Type:** Individual, open-documentation (no AI assistants or collaboration)
- **Submission:** Your private GitHub repository
- **Requirements:**
  - All contracts must compile
  - All tests must pass (`yarn test:local`)
  - Complete UI demonstration with screenshots
  - Show your calculations

### Technologies Used:

- Solidity (Smart Contracts)
- Hardhat (Development Framework)
- OpenZeppelin (ERC20 Implementation)
- Uniswap V3 (DEX Protocol)
- MetaMask (Wallet Integration)
- Scaffold-ETH 2 (Frontend)

---

## 📖 Exam Requirements

- **Duration:** 3 hours
- **Type:** Individual exam
- **Submission:** Your private repository
- All TODO items must be completed
- All tests must pass: `yarn test:local`
- Academic integrity is strictly enforced

---

## 📚 What You Need to Study

### 1. ERC20 Fungible Tokens

ERC20 is the standard for fungible tokens on Ethereum. You should understand:

#### Key Concepts:

- **Fungible Tokens**: Tokens where each unit is identical and interchangeable (USDC, DAI, WETH)
- **OpenZeppelin ERC20** Implementation:

**Study Resources:**

- [ERC-20: Token Standard](https://github.com/ethereum/ERCs/blob/master/ERCS/erc-20.md)
- [Understanding Token Decimals](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals)

---

### 2. Uniswap V3 Decentralized Exchange

Uniswap V3 is a DEX protocol for swapping tokens and providing liquidity. You should understand:

#### Key Concepts:

**Liquidity Pools:**

- Smart contracts holding reserves of two tokens
- Enable trading between token pairs
- Liquidity providers earn trading fees

**Price and Ticks:**

```
price = 1.0001^tick
```

- **Tick**: Integer representing a price point
- **sqrtPriceX96**: Square root of price (Q64.96 fixed-point number)

**Pool Fees:**

- 0.05% (500) - stablecoin pairs
- 0.3% (3000) - most pairs
- 1% (10000) - exotic pairs

#### Core Contracts to Know:

**1. IUniswapV3Factory** - Creates pools:

```solidity
function createPool(address tokenA, address tokenB, uint24 fee)
    external returns (address pool);
```

**2. INonfungiblePositionManager** - Manages liquidity as NFTs:

```solidity
function mint(MintParams calldata params) external payable returns (
    uint256 tokenId,
    uint128 liquidity,
    uint256 amount0,
    uint256 amount1
);
```

**3. ISwapRouter** - Executes token swaps:

```solidity
function exactInputSingle(ExactInputSingleParams calldata params)
    external payable returns (uint256 amountOut);
```

**Study Resources:**

- [Uniswap V3 Documentation](https://docs.uniswap.org/contracts/v3/overview)
- [Uniswa V3 SwapRouter](https://docs.uniswap.org/contracts/v3/reference/periphery/SwapRouter)
- [Tick Math Explained](https://rareskills.io/post/uniswap-v3-ticks)

---

### 3. MetaMask Wallet Usage

You must be proficient with MetaMask for this exam:

#### Required Skills:

- **Connect MetaMask** to local Hardhat network (Chain ID: 31337)
- **Import accounts** using private keys
- **Switch between accounts** for multi-user testing
- **Sign transactions** and confirm contract interactions
- **Monitor balances** and transaction history

#### Hardhat Test Accounts:

```
Account 0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account 1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

---

## 🛠️ Setup Instructions

> NOTE: These instructions are for the day of the exam when the exam code has been pushed to the repository.

### Prerequisites

Before starting, ensure you have:

- **Node.js** >= 18.17.0
- **Yarn** package manager
- **Git**
- **MetaMask** browser extension

### 1. Clone the Repository

```bash
git clone https://github.com/FinHubSA/ethereum-class-exam-2025.git
cd ethereum-class-exam-2025
```

### 2. Create Your Own Repository

1. **Create a new private repository** on GitHub (e.g., `ethereum-exam-yourname`)
2. **Set your repository as the remote origin:**

```bash
# Remove the original remote
git remote remove origin

# Add your repository as the new origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to your repository
git push -u origin main
```

> **IMPORTANT:** Your repository must be **private** to prevent plagiarism. Add your instructor as a collaborator for grading.

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start Local Blockchain

In your exam repository, start the local Hardhat network:

```bash
yarn chain
```

### 5. Deploy Uniswap V3 Contracts

> **Note:** If you already have `hardhat-uniswapV3-deploy` setup from the assignment, you can skip steps 1-2.

**Step 1:** Clone the Uniswap V3 deployment repository:

```bash
# Navigate to a directory of your choice
git clone https://github.com/FinHubSA/hardhat-uniswapV3-deploy.git
cd hardhat-uniswapV3-deploy
npm install
```

**Step 2:** Deploy Uniswap V3 contracts:

> NOTE: `yarn chain` should already be running in your exam project's terminal

```bash
npx hardhat deploy-uniswap
```

This deploys the uniswap smart contracts on the following addresses:

- **Uniswap V3 Factory:** `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- **Position Manager:** `0x5FC8d32690cc91D4c39d9d3abcBD16989F875707`
- **Swap Router:** `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`
- **WETH9:** `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### 6. Run Tests

In a new terminal:

```bash
yarn test:local
```

### 7. Compile Contracts

```bash
yarn compile
```

### 8. Start Frontend (Optional)

```bash
yarn start
```

Visit `http://localhost:3000/debug` to interact with contracts via the debug interface.

---

## 🧪 Practice: Minting Liquidity with MetaMask

The `LiquidityCustodian.sol` contract solution can be found here: [uniswap-pool-solution](https://github.com/FinHubSA/EthereumClassAssignment-2025/tree/uniswap-pool-solution) and can be used for practice:

### Practice Steps:

1. **Connect MetaMask** to local network (Chain ID: 31337)
2. **Import Account 0** using the private key above
3. **Create a liquidity pool and mint liquidity**

This practice will prepare you for the UI demonstration task.

---

## 📞 Need Help?

**Technical Issues:** Contact the instructor at takunda.chirema@uct.ac.za

---

**Good luck! 🍀**
