import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  31337: {
    UniswapV3Router: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: [
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes",
                  name: "path",
                  type: "bytes",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMinimum",
                  type: "uint256",
                },
              ],
              internalType: "struct ISwapRouter.ExactInputParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "exactInput",
          outputs: [
            {
              internalType: "uint256",
              name: "amountOut",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "tokenIn",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenOut",
                  type: "address",
                },
                {
                  internalType: "uint24",
                  name: "fee",
                  type: "uint24",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMinimum",
                  type: "uint256",
                },
                {
                  internalType: "uint160",
                  name: "sqrtPriceLimitX96",
                  type: "uint160",
                },
              ],
              internalType: "struct ISwapRouter.ExactInputSingleParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "exactInputSingle",
          outputs: [
            {
              internalType: "uint256",
              name: "amountOut",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes",
                  name: "path",
                  type: "bytes",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMaximum",
                  type: "uint256",
                },
              ],
              internalType: "struct ISwapRouter.ExactOutputParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "exactOutput",
          outputs: [
            {
              internalType: "uint256",
              name: "amountIn",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "tokenIn",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenOut",
                  type: "address",
                },
                {
                  internalType: "uint24",
                  name: "fee",
                  type: "uint24",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMaximum",
                  type: "uint256",
                },
                {
                  internalType: "uint160",
                  name: "sqrtPriceLimitX96",
                  type: "uint160",
                },
              ],
              internalType: "struct ISwapRouter.ExactOutputSingleParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "exactOutputSingle",
          outputs: [
            {
              internalType: "uint256",
              name: "amountIn",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
      ],
    },
    UniswapV3Factory: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint24",
              name: "fee",
              type: "uint24",
            },
            {
              indexed: true,
              internalType: "int24",
              name: "tickSpacing",
              type: "int24",
            },
          ],
          name: "FeeAmountEnabled",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "oldOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnerChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "token0",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "token1",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint24",
              name: "fee",
              type: "uint24",
            },
            {
              indexed: false,
              internalType: "int24",
              name: "tickSpacing",
              type: "int24",
            },
            {
              indexed: false,
              internalType: "address",
              name: "pool",
              type: "address",
            },
          ],
          name: "PoolCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenA",
              type: "address",
            },
            {
              internalType: "address",
              name: "tokenB",
              type: "address",
            },
            {
              internalType: "uint24",
              name: "fee",
              type: "uint24",
            },
          ],
          name: "createPool",
          outputs: [
            {
              internalType: "address",
              name: "pool",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint24",
              name: "fee",
              type: "uint24",
            },
            {
              internalType: "int24",
              name: "tickSpacing",
              type: "int24",
            },
          ],
          name: "enableFeeAmount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint24",
              name: "fee",
              type: "uint24",
            },
          ],
          name: "feeAmountTickSpacing",
          outputs: [
            {
              internalType: "int24",
              name: "",
              type: "int24",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenA",
              type: "address",
            },
            {
              internalType: "address",
              name: "tokenB",
              type: "address",
            },
            {
              internalType: "uint24",
              name: "fee",
              type: "uint24",
            },
          ],
          name: "getPool",
          outputs: [
            {
              internalType: "address",
              name: "pool",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          name: "setOwner",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    WETH9: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "deposit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      external: true,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
