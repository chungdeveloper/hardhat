import {
    ActivePool__factory,
    BorrowerOperations__factory,
    BorrowerOperationsScript,
    BorrowerOperationsScript__factory,
    BorrowerWrappersScript__factory,
    CollSurplusPool__factory,
    CommunityIssuance__factory,
    DefaultPool__factory,
    HintHelpers,
    HintHelpers__factory,
    LockupContractFactory__factory,
    LQTYStaking__factory,
    LQTYToken__factory,
    LUSDToken,
    LUSDToken__factory,
    PriceFeed__factory,
    SortedTroves__factory,
    StabilityPool__factory,
    TroveManager,
    TroveManager__factory
} from "../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumber, BigNumberish} from "ethers";

const {ethers} = require("hardhat");

let currentLatestRandomSeed: BigNumber = BigNumber.from('31337');

async function main() {
    const [acc0, acc1, acc2, acc3, bounty, lpRewards, multisig, deployed,] = await ethers.getSigners();
    const lastBalance = await deployed.getBalance();

    console.log("//==================================================================================================================")

    console.log("deployed: %s", deployed.address);
    console.log("bounty: %s", bounty.address);
    console.log("lpRewards: %s", lpRewards.address);
    console.log("multisig: %s", multisig.address);
    console.log("acc0: %s", acc0.address);
    console.log("acc1: %s", acc1.address);
    console.log("acc2: %s", acc2.address);
    console.log("acc3: %s", acc3.address);

    console.log("//==================================================================================================================")

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

    const HintHelpers = (await ethers.getContractFactory("HintHelpers", deployed)) as HintHelpers__factory;
    const _hintHelpers = await HintHelpers.deploy();
    await _hintHelpers.deployed();
    console.log("_hintHelpers: ", _hintHelpers.address);

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

    console.log("//==================================================================================================================")

    const lqtyStakingTx = await _lqtyStaking.setAddresses(
        _lqtyToken.address,
        _lusdToken.address,
        _troveManager.address,
        _borrowerOperations.address,
        _activePool.address,
    );
    console.log("lqtyStakingTx: ", lqtyStakingTx.hash)

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

    const activePoolsSetAddressTx = await _activePool.setAddresses(
        _borrowerOperations.address,
        _troveManager.address,
        _stabilityPool.address,
        _defaultPool.address,
    );
    console.log("activePoolsSetAddressTx: ", activePoolsSetAddressTx.hash);

    const defaultPoolSetAddressTx = await _defaultPool.setAddresses(
        _troveManager.address,
        _activePool.address,
    );
    console.log("defaultPoolSetAddressTx: ", defaultPoolSetAddressTx.hash);

    const stabilityPoolTx = await _stabilityPool.setAddresses(_borrowerOperations.address,
        _troveManager.address,
        _activePool.address,
        _lusdToken.address,
        _sortedTroves.address,
        _priceFeed.address,
        _communityIssuance.address,
    );
    console.log("stabilityPoolTx: ", stabilityPoolTx.hash)

    const collSurplusPoolTx = await _collSurplusPool.setAddresses(
        _borrowerOperations.address,
        _troveManager.address,
        _activePool.address,
    );
    console.log("collSurplusPoolTx: ", collSurplusPoolTx.hash)

    // const priceFeedTx = await _priceFeed.setAddresses(
    //     _priceAggregator.address,
    //     _tellorCaller.address,
    // );
    // console.log("priceFeedTx: ", priceFeedTx.hash)

    const sortedTrovesTx = await _sortedTroves.setParams(
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        _troveManager.address,
        _borrowerOperations.address,
    );
    console.log("sortedTrovesTx: ", sortedTrovesTx.hash)

    const borrowerOperationsTx = await _borrowerOperations.setAddresses(
        _troveManager.address,
        _activePool.address,
        _defaultPool.address,
        _stabilityPool.address,
        _gasPool.address,
        _collSurplusPool.address,
        _priceFeed.address,
        _sortedTroves.address,
        _lusdToken.address,
        _lqtyStaking.address,
    );

    console.log("borrowerOperationsTx: ", borrowerOperationsTx.hash);

    const communityIssuanceTx = await _communityIssuance.setAddresses(
        _lqtyToken.address,
        _stabilityPool.address,
    );
    console.log("communityIssuanceTx: ", communityIssuanceTx.hash)

    const hintHelpersTx = await _hintHelpers.setAddresses(
        _sortedTroves.address,
        _troveManager.address,
    );
    console.log("hintHelpersTx: ", hintHelpersTx.hash)

    const lockupContractFactoryTx = await _lockupContractFactory.setLQTYTokenAddress(_lqtyToken.address);

    console.log("lockupContractFactoryTx: ", lockupContractFactoryTx.hash)
    console.log("Gas used: ", lastBalance - await deployed.getBalance());

    const priceFeedTx = await _priceFeed.updatePrice('1808225102000000000000');
    console.log('priceFeedTx: ', priceFeedTx.hash);

    console.log("//==================================================================================================================");

    await createTrove(acc2, _borrowerOperations.address, _lusdToken, _troveManager, _hintHelpers, '30000000000000000000', '6000000000000000000000');
    await createTrove(acc3, _borrowerOperations.address, _lusdToken, _troveManager, _hintHelpers, '16000000000000000000', '12000000000000000000000');
    await createTrove(acc0, _borrowerOperations.address, _lusdToken, _troveManager, _hintHelpers, '10000000000000000000', '15000000000000000000000');
    await createTrove(acc1, _borrowerOperations.address, _lusdToken, _troveManager, _hintHelpers, '10000000000000000000', '15000000000000000000000');

    console.log("TCR: %s; currentLatestRandomSeed: %s", await _troveManager.getTCR('1819000000000000000000'), currentLatestRandomSeed)
}

async function createTrove(
    acc: SignerWithAddress,
    borrowContractAddress: string,
    token: LUSDToken,
    troveManager: TroveManager,
    hintHelper: HintHelpers,
    coll: BigNumberish,
    debt: BigNumberish,
) {
    console.log("\n//================================================%s================================================", acc.address);
    const borrowerOperations = await BorrowerOperations__factory.connect(borrowContractAddress, acc);
    console.log("before debt ETH Balance: %s - USD Balance: %s", await acc.getBalance(), await token.balanceOf(acc.address))
    const {upperHint, lowerHint} = await getBorrowerOpsListHint(hintHelper, coll, debt, acc);
    console.log("upperHint: %s; lowerHint: %s", upperHint, lowerHint);
    const tx = await borrowerOperations.openTrove(
        '50000000000000000',
        debt,
        upperHint,
        lowerHint,
        {value: coll});
    console.log("OpenTroveTX: ", tx.hash);
    console.log("Trove coll: %s; debt: %s", await troveManager.getTroveColl(acc.address), await troveManager.getTroveDebt(acc.address))
    console.log("After debt ETH Balance: %s - USD Balance: %s", await acc.getBalance(), await token.balanceOf(acc.address))
}

async function getBorrowerOpsListHint(hintHelpers: HintHelpers, newColl: BigNumberish, newDebt: BigNumberish, acc: SignerWithAddress) {
    const newNICR = await hintHelpers.computeNominalCR(newColl, newDebt)
    const {
        hintAddress: approxfullListHint,
        latestRandomSeed
    } = await hintHelpers.getApproxHint(newNICR, 5, currentLatestRandomSeed)
    currentLatestRandomSeed = latestRandomSeed;

    const {
        0: upperHint,
        1: lowerHint,
    } = await SortedTroves__factory.connect(await hintHelpers.sortedTroves(), acc).findInsertPosition(newNICR, approxfullListHint, approxfullListHint)
    return {upperHint, lowerHint}
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});