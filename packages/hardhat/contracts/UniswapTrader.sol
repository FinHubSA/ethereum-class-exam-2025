// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma abicoder v2;

import '../lib/uniswap/v3-periphery/interfaces/ISwapRouter.sol';
import '../lib/uniswap/v3-periphery/libraries/TransferHelper.sol';
import '../lib/openzeppelin/token/ERC20/IERC20.sol';

/// @title UniswapTrader
/// @notice A contract for swapping USDC and WETH tokens using Uniswap V3
contract UniswapTrader {
    ISwapRouter public immutable swapRouter;
    address public immutable usdc;
    address public immutable weth;
    
    // Pool fee - 1% (10000 basis points where 1 basis point = 0.0001%)
    uint24 public constant poolFee = 10_000;

    event TokensSwapped(
        address indexed sender,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    /// @notice Constructor to initialize the contract with token addresses and SwapRouter
    /// @param _swapRouter The address of the Uniswap V3 SwapRouter contract
    /// @param _usdc The address of the USDC token
    /// @param _weth The address of the WETH token
    constructor(
        address _swapRouter,
        address _usdc,
        address _weth
    ) {
        require(_swapRouter != address(0), "Invalid SwapRouter address");
        require(_usdc != address(0), "Invalid USDC address");
        require(_weth != address(0), "Invalid WETH address");
        
        swapRouter = ISwapRouter(_swapRouter);
        usdc = _usdc;
        weth = _weth;
    }

    // TODO: Implement the swap function
    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMinimum
    ) external returns (uint256 amountOut) {
    }
}

