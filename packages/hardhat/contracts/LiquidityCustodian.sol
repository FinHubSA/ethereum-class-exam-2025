// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma abicoder v2;

import '../lib/openzeppelin/token/ERC721/IERC721Receiver.sol';
import '../lib/uniswap/v3-core/interfaces/IUniswapV3Pool.sol';
import '../lib/uniswap/v3-core/interfaces/IUniswapV3Factory.sol';
import '../lib/uniswap/v3-core/libraries/TickMath.sol';
import '../lib/uniswap/v3-periphery/interfaces/ISwapRouter.sol';
import '../lib/uniswap/v3-periphery/interfaces/INonfungiblePositionManager.sol';
import '../lib/uniswap/v3-periphery/libraries/TransferHelper.sol';
import '../lib/uniswap/v3-periphery/interfaces/external/IWETH9.sol';

import "hardhat/console.sol";

contract LiquidityCustodian is IERC721Receiver {
    address public immutable usdc;
    address public immutable weth;
    address public liquidityPoolAddress;

    // TODO: Set the _poolTick value such that the initial price of WETH is as close as possible to $4000 USDC
    int24 private _poolTick;
    uint24 private constant _dexPoolFee = 10_000; // 1% (denominated in hundredths of a bip; 100 bips = 0.01%) 

    INonfungiblePositionManager public immutable uniswapPositionManager;
    IUniswapV3Factory public immutable uniswapV3Factory;

    event PoolCreated(address tk, address pool, uint160 sqrtPriceX96);

    /// @notice Represents the deposit of an NFT
    struct Deposit {
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    /// @dev deposits[tokenId] => Deposit
    mapping(uint256 => Deposit) public deposits;

    /// @dev liquidityTokens[address] => uint256[]
    mapping(address => uint256[]) public liquidityTokens;

    constructor(
        address _uniswapV3Factory, 
        address _uniswapPositionManager,
        address _usdc,
        address _weth
    ) {
        uniswapV3Factory = IUniswapV3Factory(_uniswapV3Factory);
        uniswapPositionManager = INonfungiblePositionManager(_uniswapPositionManager);

        usdc = _usdc;
        weth = _weth;
    }

    /// @notice Creates and initializes a WETH/USDC liquidity pool
    function createPool() public {
        // assign WETH and USDC addresses to new variables token0_ and token1_ addresses
        // NOTE: for a uniswap pool token0 address should be strictly less than token1
        (address token0_, address token1_) = usdc < weth ? (usdc, weth) : (weth, usdc);

        // create a liquidity pool of WETH and USDC token using uniswap factory
        address liquidityPoolAddress_ = uniswapV3Factory.createPool(token0_, token1_, _dexPoolFee);

        // assign the liquidityPoolAddress
        liquidityPoolAddress = liquidityPoolAddress_;

        // get the square of the price using at the _poolTick TickMath library from Uniswap
        // NOTE: sqrtPriceX96 is a A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0)
        uint160 sqrtPriceX96 = TickMath.getSqrtRatioAtTick(_poolTick);
        
        // initialize the pool with the sqrtPriceX96
        IUniswapV3Pool(liquidityPoolAddress_).initialize(sqrtPriceX96);

        // emit the PoolCreate event
        emit PoolCreated(usdc, liquidityPoolAddress_, sqrtPriceX96);
    }

    /// @notice Implementing `onERC721Received` so this contract can receive custody of erc721 tokens
    /// @param operator The address which called `safeTransferFrom` function
    /// @param tokenId The NFT identifier which is being transferred
    /// @return bytes4 The function selector to confirm the token transfer
    function onERC721Received(
        address operator,
        address,
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        // create a deposit for the NFT
        _createDeposit(operator, tokenId);

        return this.onERC721Received.selector;
    }

    /// @notice Stores the details of the deposited liquidity position's NFT
    /// @param owner The address of the liquidity position owner
    /// @param tokenId Id of the ERC721 token minted to represent ownership of the liquidity position
    function _createDeposit(address owner, uint256 tokenId) internal {
        // get the position details that has been staked in the uniswap NFT manager
        (, , address token0, address token1, , , , uint128 liquidity, , , , ) =
            uniswapPositionManager.positions(tokenId);

        // set the owner and details for position
        // NOTE: the owner of the deposit is whoever has created the liquidity through this contract or elsewhere and sent this contract their NFT
        deposits[tokenId] = Deposit({owner: owner, liquidity: liquidity, token0: token0, token1: token1});
        liquidityTokens[owner].push(tokenId);
    }

    /// @notice Takes in an address and index as parameters and returns a tokenId.
    /// @param owner The address of the liquidity position owner
    /// @param index The index of the tokenId to be returned if the owner has more than 1 liquidity positions
    /// @return uint256 TokenId that represents the liquidity position owned by the address
    function liquidityTokenByIndex(address owner, uint256 index) public view virtual returns (uint256) {
        require(liquidityTokens[owner].length > 0, "The address has no liquidity tokens");
        
        uint256[] memory _liquidityTokens = liquidityTokens[owner];

        require(index < _liquidityTokens.length, "The index is out of bounds");

        return _liquidityTokens[index];
    }

    /// @notice Calls the mint function defined in periphery, mints amounts of tokens passed in the parameters
    /// Providing liquidity in both assets means liquidity will be earning fees and is considered in-range.
    /// @return tokenId The id of the newly minted ERC721
    /// @return liquidity The amount of liquidity for the position
    /// @return amount0 The amount of token0
    /// @return amount1 The amount of token1
    function mintNewPosition(uint256 usdcAmountToMint, uint256 wethAmountToMint)
        external
        returns (
            uint256 tokenId,
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
        )
    {
        (address token0_, address token1_) = usdc < weth ? (usdc, weth) : (weth, usdc);
        (uint256 amount0ToMint, uint256 amount1ToMint) = usdc < weth ? (usdcAmountToMint, wethAmountToMint) : (wethAmountToMint, usdcAmountToMint);

        // transfer the token0, amount0ToMint, from the msg.sender to this contract
        TransferHelper.safeTransferFrom(token0_, msg.sender, address(this), amount0ToMint);
        // transfer the token1, amount1ToMint, from the msg.sender to this contract
        TransferHelper.safeTransferFrom(token1_, msg.sender, address(this), amount1ToMint);

        // approve the uniswap position manager to transfer amount0ToMint of token0
        TransferHelper.safeApprove(token0_, address(uniswapPositionManager), amount0ToMint);
        // approve the uniswap position manager to transfer amount1ToMint of token1
        TransferHelper.safeApprove(token1_, address(uniswapPositionManager), amount1ToMint);

        INonfungiblePositionManager.MintParams memory params =
            INonfungiblePositionManager.MintParams({
                token0: token0_,
                token1: token1_,
                fee: _dexPoolFee,
                tickLower: -887200, 
                tickUpper: 887200,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });

        // mint the liquidity position in the uniswap position manager using the params above
        // NOTE: this returns the tokenId of the minted NFT that represents the liquidity position
        (tokenId, liquidity, amount0, amount1) = uniswapPositionManager.mint(params);

        // create the deposit record for the minter/msg.sender
        _createDeposit(msg.sender, tokenId);

        // Remove allowance and refund in both assets.
        if (amount0 < amount0ToMint) {
            TransferHelper.safeApprove(token0_, address(uniswapPositionManager), 0);
            uint256 refund0 = amount0ToMint - amount0;
            TransferHelper.safeTransfer(token0_, msg.sender, refund0);
        }

        if (amount1 < amount1ToMint) {
            TransferHelper.safeApprove(token1_, address(uniswapPositionManager), 0);
            uint256 refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(token1_, msg.sender, refund1);
        }
    }


    /// @notice Transfers the NFT to the owner
    /// @param tokenId The id of the erc721
    function retrieveNFT(uint256 tokenId) external {
        // must be the owner of the NFT
        require(msg.sender == deposits[tokenId].owner, 'Not the owner');
        // transfer ownership to original owner
        uniswapPositionManager.safeTransferFrom(address(this), msg.sender, tokenId);
        //remove information related to tokenId
        delete deposits[tokenId];
        _deleteLiquidityToken(msg.sender, tokenId);
    }

    /// @notice Removes a tokenId from the liquidityTokens array for a given owner
    /// @param ownerAddress The address of the liquidity position owner
    /// @param tokenId The tokenId to remove from the array
    function _deleteLiquidityToken(address ownerAddress, uint256 tokenId) private {
        uint256[] storage tokens = liquidityTokens[ownerAddress];
        uint256 length = tokens.length;
        
        for (uint256 i = 0; i < length; i++) {
            if (tokens[i] == tokenId) {
                // Move the last element to the position being deleted
                tokens[i] = tokens[length - 1];
                // Remove the last element
                tokens.pop();
                break;
            }
        }
    }
}