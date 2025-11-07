# Setup

## Prerequisites

Before starting the exam, ensure you have the following installed:

- Node.js >= 18.17.0
- Yarn package manager
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/FinHubSA/ethereum-class-exam-2025.git
cd ethereum-class-exam-2025
```

### 2. Create Your Own Private Repository

Before you begin, you need to create your own repository for submission:

1. **Create a new private repository** on GitHub:

   - Go to GitHub and create a new repository (e.g., `ethereum-exam-yourname`)
   - Make sure it's set to **Private**
   - Do NOT initialize with README, .gitignore, or license

2. **Set your repository as the remote origin:**

```bash
# Remove the original remote
git remote remove origin

# Add your repository as the new origin (replace with your details)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify the new remote
git remote -v

# Push to your repository
git push -u origin main
```

3. **Add your instructor as a collaborator:**
   - In your GitHub repository settings
   - Navigate to Settings → Collaborators
   - Add: `takundachirema` (or as instructed)

> **⚠️ IMPORTANT:** Your repository MUST be private. Public repositories will be considered as facilitating plagiarism.

### 3. Install Dependencies

```bash
yarn install
```

### 4. Understanding the Project Structure

This is a Scaffold-ETH 2 monorepo with:

```
packages/
├── hardhat/          # Smart contracts and tests
│   ├── contracts/    # Solidity contracts
│   ├── deploy/       # Deployment scripts
│   ├── test/         # Test files
│   └── lib/          # Library contracts (OpenZeppelin, Uniswap)
├── nextjs/           # Frontend
└── └── contracts/    # Solidity contracts ABIs (You'll update the externalContracts.ts)
```

### 5. Running the Local Blockchain

Open a terminal and run:

```bash
yarn chain
```

This starts a local Hardhat network with Uniswap V3 deployed.

### 6. Installing UniswapV3 smart contracts

> NOTE: If you already have `hardhat-uniswapV3-deploy.git` setup from the assignment you can skip step 1 and 2.

1. On your terminal, navigate to a directory/folder of your choice using `cd example/directory` and run the following git command in your terminal:

```bash
git clone https://github.com/FinHubSA/hardhat-uniswapV3-deploy.git
```

2. Navigate into the `hardhat-uniswapV3-deploy` then run the command `npm install` to install the nodejs libraries

```bash
cd hardhat-uniswapV3-deploy
npm install
```

3. Deploy the Uniswap V3 smart contracts

```
npx hardhat deploy-uniswap
```

### 7. Running Tests

In a new terminal:

```bash
yarn test:local
```

### 8. Compiling Contracts

```bash
yarn compile
```

## Important Files for the Exam

### Contracts to Complete:

1. `packages/hardhat/contracts/USDCoin.sol` - ERC20 token implementation
2. `packages/hardhat/contracts/LiquidityCustodian.sol` - Pool price calculation
3. `packages/hardhat/contracts/UniswapTrader.sol` - Swap implementation

### Scripts to Complete:

4. `packages/hardhat/deploy/00_deploy_contracts.ts` - Deployment logic

### Configuration to Complete:

5. `packages/nextjs/contracts/externalContracts.ts` - External contract ABIs

## Troubleshooting

### Test Failures

Make sure you:

1. Have implemented all TODO items
2. Are running `yarn chain` in a separate terminal
3. Have deployed the Uniswap-V3 smart contracts
4. Have run the tests using `yarn test:local`
