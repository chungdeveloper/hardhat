import {
    ActivePool__factory,
    BorrowerOperations__factory,
    CollSurplusPool__factory,
    CommunityIssuance__factory,
    DefaultPool__factory, LockupContractFactory__factory,
    LQTYStaking__factory,
    LQTYToken__factory,
    LUSDToken__factory,
    PriceFeed__factory,
    SortedTroves__factory,
    StabilityPool__factory,
    TroveManager__factory
} from "../typechain-types";

const {ethers} = require("hardhat");

async function main() {
    const [bounty, lpRewards, multisig, deployed] = await ethers.getSigners();

    const TroveManager = (await ethers.getContractFactory("TroveManager", deployed)) as TroveManager__factory;
    const _troveManager = await TroveManager.deploy();
    await _troveManager.deployed();
    console.log("troveManager: ", _troveManager.address);

    const ActivePool = (await ethers.getContractFactory("ActivePool", deployed)) as ActivePool__factory;
    const _activePool = await ActivePool.deploy();
    await _activePool.deployed();
    console.log("activePool: ", _activePool.address);

    const DefaultPool = (await ethers.getContractFactory("DefaultPool", deployed)) as DefaultPool__factory;
    const _defaultPool = await DefaultPool.deploy();
    await _defaultPool.deployed();
    console.log("defaultPool: ", _defaultPool.address);

    const StabilityPool = (await ethers.getContractFactory("StabilityPool", deployed)) as StabilityPool__factory;
    const _stabilityPool = await StabilityPool.deploy();
    await _stabilityPool.deployed();
    console.log("_stabilityPool: ", _stabilityPool.address);

    const GasPool = (await ethers.getContractFactory("GasPool", deployed));
    const _gasPool = await GasPool.deploy();
    await _gasPool.deployed();
    console.log("_gasPool: ", _gasPool.address);

    const CollSurplusPool = (await ethers.getContractFactory("CollSurplusPool", deployed)) as CollSurplusPool__factory;
    const _collSurplusPool = await CollSurplusPool.deploy();
    await _collSurplusPool.deployed();
    console.log("collSurplusPool: ", _collSurplusPool.address);

    const PriceFeed = (await ethers.getContractFactory("PriceFeed", deployed)) as PriceFeed__factory;
    const _priceFeed = await PriceFeed.deploy();
    await _priceFeed.deployed();
    console.log("priceFeed: ", _priceFeed.address);

    const SortedTroves = (await ethers.getContractFactory("SortedTroves", deployed)) as SortedTroves__factory;
    const _sortedTroves = await SortedTroves.deploy();
    await _sortedTroves.deployed();
    console.log("sortedTroves: ", _sortedTroves.address);

    const BorrowerOperations = (await ethers.getContractFactory("BorrowerOperations", deployed)) as BorrowerOperations__factory;
    const _borrowerOperations = await BorrowerOperations.deploy();
    await _borrowerOperations.deployed();
    console.log("borrowerOperations: ", _borrowerOperations.address);

    const LUSDToken = (await ethers.getContractFactory("LUSDToken", deployed)) as LUSDToken__factory;
    const _lusdToken = await LUSDToken.deploy(_troveManager.address, _stabilityPool.address, _borrowerOperations.address);
    await _lusdToken.deployed();
    console.log("lusdToken: ", _lusdToken.address);

    const CommunityIssuance = (await ethers.getContractFactory("CommunityIssuance", deployed)) as CommunityIssuance__factory;
    const _communityIssuance = await CommunityIssuance.deploy();
    await _communityIssuance.deployed();
    console.log("communityIssuance: ", _communityIssuance.address);

    const LQTYStaking = (await ethers.getContractFactory("LQTYStaking", deployed)) as LQTYStaking__factory;
    const _lqtyStaking = await LQTYStaking.deploy();
    await _lqtyStaking.deployed();
    console.log("lqtyStaking: ", _lqtyStaking.address);

    const LockupContractFactory = (await ethers.getContractFactory("LockupContractFactory", deployed)) as LockupContractFactory__factory;
    const _lockupContractFactory = await LockupContractFactory.deploy();
    await _lockupContractFactory.deployed();
    console.log("lockupContractFactory: ", _lockupContractFactory.address);

    const LQTYToken = (await ethers.getContractFactory("LQTYToken", deployed)) as LQTYToken__factory;
    const _lqtyToken = await LQTYToken.deploy(_communityIssuance.address, _lqtyStaking.address, _lockupContractFactory.address, bounty.address, lpRewards.address, multisig.address);
    await _lqtyToken.deployed();
    console.log("lqtyToken: ", _lqtyToken.address);

    //==================================================================================================================

    const troveManagerSetAddressTx = await _troveManager.setAddresses(
        _borrowerOperations.address,
        _activePool.address,
        _defaultPool.address,
        _stabilityPool.address,
        _gasPool.address,
        _collSurplusPool.address,
        _priceFeed.address,
        _lusdToken.address,
        _sortedTroves.address,
        _lqtyToken.address,
        _lqtyStaking.address,
    );

    console.log("troveManagerSetAddressTx: ", troveManagerSetAddressTx.hash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});