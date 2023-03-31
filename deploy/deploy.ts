import {Wallet} from "zksync-web3";
// import * as ethers from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import {Decimal} from "../scripts/Decimal";
import {sha256} from "js-sha256";

const {
    deploy,
    acc1,
    acc2,
    acc5,
} = require('../secret.json');

export default async function (hre: HardhatRuntimeEnvironment) {
    console.log("Start deploy zkSync... ");

    const result: any = {
        chainId: hre.network.config.chainId,
        version: '',
        deploymentDate: 0,
        bootstrapPeriod: 0,
        totalStabilityPoolLQTYReward: 0,
        liquidityMiningLQTYRewardRate: 0,
        _priceFeedIsTestnet: false,
        _uniTokenIsMock: false,
        _isDev: false,
        startBlock: 0,
        addresses: {
            activePool: '',
            borrowerOperations: '',
            troveManager: '',
            collSurplusPool: '',
            communityIssuance: '',
            defaultPool: '',
            hintHelpers: '',
            lockupContractFactory: '',
            lqtyStaking: '',
            priceFeed: '',
            sortedTroves: '',
            stabilityPool: '',
            gasPool: '',
            unipool: '',
            lusdToken: '',
            lqtyToken: '',
            multiTroveGetter: '',
            uniToken: ''
        }
    };

    const wallet = new Wallet(deploy.toString());
    const bounty = new Wallet(acc1.toString());
    const multisig = new Wallet(acc2.toString());
    const feeToFactory = new Wallet(acc5.toString());

    const deployer = new Deployer(hre, wallet);

    const weth9 = await deployer.loadArtifact("WETH9");
    const _weth9 = await deployer.deploy(weth9);
    const weth9Receipt = await _weth9.deployTransaction.wait();
    console.log("WETH9 Address: ", _weth9.address);
    const startBlockNumber = weth9Receipt.blockNumber;
    result.startBlock = startBlockNumber;
    result.version = sha256(startBlockNumber.toString());

    const UniswapV2Factory = await deployer.loadArtifact("UniswapV2Factory");
    const _uniswapV2Factory = await deployer.deploy(UniswapV2Factory, [wallet.address]);
    // const _uniswapV2Factory = UniswapV2Factory__factory.connect('0x3fa03b7a4CCE720967a30889c8Fc0038A1580067', wallet);
    console.log("UniswapV2Factory: ", _uniswapV2Factory.address);

    const ActivePool = await deployer.loadArtifact("ActivePool");
    const _activePool = await deployer.deploy(ActivePool);
    // const _activePool = ActivePool__factory.connect('0x3fa03b7a4CCE720967a30889c8Fc0038A1580067', wallet);
    console.log("ActivePool: ", _activePool.address);
    result.addresses.activePool = _activePool.address;

    const troveManager = await deployer.loadArtifact("TroveManager");
    const _troveManager = await deployer.deploy(troveManager);
    // const _troveManager = TroveManager__factory.connect('0x73Fd84F354BFb6d21387f75803109298E93899cF', wallet);
    console.log("TroveManager: ", _troveManager.address);
    result.addresses.troveManager = _troveManager.address;

    const DefaultPool = await deployer.loadArtifact("DefaultPool");
    const _defaultPool = await deployer.deploy(DefaultPool);
    // const _defaultPool = DefaultPool__factory.connect("0xa17E606834400c1ab462F76B0b4567e10E613722", wallet);
    console.log("DefaultPool: ", _defaultPool.address);
    result.addresses.defaultPool = _defaultPool.address;

    const StabilityPool = await deployer.loadArtifact("StabilityPool");
    const _stabilityPool = await deployer.deploy(StabilityPool);
    // const _stabilityPool = StabilityPool__factory.connect("0xB2E9A912527334Ec1798ca7E0E543B49D71EfFC5", wallet);
    console.log("StabilityPool: ", _stabilityPool.address);
    result.addresses.stabilityPool = _stabilityPool.address;

    const HintHelpers = await deployer.loadArtifact("HintHelpers");
    const _hintHelpers = await deployer.deploy(HintHelpers);
    // const _hintHelpers = HintHelpers__factory.connect("0xDC0dB363f4dFCCb5e440c47B1b5C84EeFB1a7302", wallet);
    console.log("HintHelpers: ", _hintHelpers.address);
    result.addresses.hintHelpers = _hintHelpers.address;

    const GasPool = await deployer.loadArtifact("GasPool");
    const _gasPool = await deployer.deploy(GasPool);
    // const _gasPool = '0xAb1F8acdc4606c68729c85109e81bc7Fa46052Cb';
    console.log("GasPool: ", _gasPool.address);
    result.addresses.gasPool = _gasPool.address;

    const CollSurplusPool = await deployer.loadArtifact("CollSurplusPool");
    const _collSurplusPool = await deployer.deploy(CollSurplusPool);
    // const _collSurplusPool = CollSurplusPool__factory.connect("0xBD0ce09422C59F634Bf317a286bCB50fd776ac87", wallet);
    console.log("CollSurplusPool: ", _collSurplusPool.address);
    result.addresses.collSurplusPool = _collSurplusPool.address;

    const PriceFeed = await deployer.loadArtifact("PriceFeed");
    const _priceFeed = await deployer.deploy(PriceFeed);
    // const _priceFeed = PriceFeed__factory.connect("0x021D1335330B8571402F6126503A7C891F247A63", wallet);
    console.log("PriceFeed: ", _priceFeed.address);
    result.addresses.priceFeed = _priceFeed.address;

    const SortedTroves = await deployer.loadArtifact("SortedTroves");
    const _sortedTroves = await deployer.deploy(SortedTroves);
    // const _sortedTroves = SortedTroves__factory.connect("0x813081310Fd7287f2201027f4dc70f06a462c464", wallet);
    console.log("SortedTroves: ", _sortedTroves.address);
    result.addresses.sortedTroves = _sortedTroves.address;

    const BorrowerOperations = await deployer.loadArtifact("BorrowerOperations");
    const _borrowerOperations = await deployer.deploy(BorrowerOperations);
    // const _borrowerOperations = BorrowerOperations__factory.connect("0x4a94761578299C014C61BB124738003456b5F208", wallet);
    console.log("BorrowerOperations: ", _borrowerOperations.address);
    result.addresses.borrowerOperations = _borrowerOperations.address;

    const RUSDToken = await deployer.loadArtifact("RUSDToken");
    const _rusdToken = await deployer.deploy(RUSDToken, [_troveManager.address, _stabilityPool.address, _borrowerOperations.address,]);
    // const _rusdToken = RUSDToken__factory.connect("0xc24bAef0E5479d38287Bc17A333C2141606aa507", wallet);
    console.log("RUSDToken: ", _rusdToken.address);
    result.addresses.lusdToken = _rusdToken.address;

    const CommunityIssuance = await deployer.loadArtifact("CommunityIssuance");
    const _communityIssuance = await deployer.deploy(CommunityIssuance);
    // const _communityIssuance = CommunityIssuance__factory.connect("0x9577e1d3cCdd2EaD7cff238EA4A215A065a8023C", wallet);
    console.log("CommunityIssuance: ", _communityIssuance.address);
    result.addresses.communityIssuance = _communityIssuance.address;

    const LQTYStaking = await deployer.loadArtifact("LQTYStaking");
    const _lqtyStaking = await deployer.deploy(LQTYStaking);
    // const _lqtyStaking = LQTYStaking__factory.connect("0xdDd4A158d30203C58ba3F94BBcBFb0C97903B8AD", wallet);
    console.log("LQTYStaking: ", _lqtyStaking.address);
    result.addresses.lqtyStaking = _lqtyStaking.address;

    const Unipool = await deployer.loadArtifact("Unipool");
    const _unipool = await deployer.deploy(Unipool);
    // const _unipool = Unipool__factory.connect("0xAf4760AD90676332619Ddc4bbAA4D9338b00e34F", wallet);
    console.log("Unipool: ", _unipool.address);
    result.addresses.unipool = _unipool.address;

    const LockupContractFactory = await deployer.loadArtifact("LockupContractFactory");
    const _lockupContractFactory = await deployer.deploy(LockupContractFactory);
    // const _lockupContractFactory = LockupContractFactory__factory.connect("0xbBD29e0229F1f15913C74F6fEC12A9Ea0520eD8B", wallet);
    console.log("LockupContractFactory: ", _lockupContractFactory.address);
    result.addresses.lockupContractFactory = _lockupContractFactory.address;

    const LQTYToken = await deployer.loadArtifact("LQTYToken");
    const _lqtyToken = await deployer.deploy(LQTYToken, [
        _communityIssuance.address,
        _lqtyStaking.address,
        _lockupContractFactory.address,
        bounty.address,
        _unipool.address,
        multisig.address,
    ]);
    // const _lqtyToken = LQTYToken__factory.connect("0xcAF0a0E77155b2c9e280e5532b01c19A5D98A631", wallet);
    console.log("LQTYToken: ", _lqtyToken.address);
    result.addresses.lqtyToken = _lqtyToken.address;

    const MultiTroveGetter = await deployer.loadArtifact("MultiTroveGetter");
    const _multiTroveGetter = await deployer.deploy(MultiTroveGetter, [_troveManager.address, _sortedTroves.address]);
    // const _multiTroveGetter = MultiTroveGetter__factory.connect("0x6873877Aa8ac353cA00a443C4Bfbd2a72CA74358", wallet);
    console.log("MultiTroveGetter: ", _multiTroveGetter.address);
    result.addresses.multiTroveGetter = _multiTroveGetter.address;

    console.log("//==================================================================================================================")

    const setFeeToUniswapV2FactoryTX = await _uniswapV2Factory.setFeeTo(feeToFactory.address);
    await setFeeToUniswapV2FactoryTX.wait();
    console.log("setFeeToUniswapV2FactoryTX: ", setFeeToUniswapV2FactoryTX.hash)

    const lpTokenTx = await _uniswapV2Factory.createPair(_weth9.address, _rusdToken.address);
    const lpReceipt = await lpTokenTx.wait();
    const lpToken = lpReceipt.events.filter(({event}) => event == 'PairCreated')[0].args.pair;
    console.log("lpTokenTx: ", lpToken)
    result.addresses.uniToken = lpToken;

    const lqtyStakingTx = await _lqtyStaking.setAddresses(
        _lqtyToken.address,
        _rusdToken.address,
        _troveManager.address,
        _borrowerOperations.address,
        _activePool.address,
    );
    await lqtyStakingTx.wait();
    console.log("lqtyStakingTx: ", lqtyStakingTx.hash)

    const troveManagerSetAddressTx = await _troveManager.setAddresses(
        _borrowerOperations.address,
        _activePool.address,
        _defaultPool.address,
        _stabilityPool.address,
        _gasPool.address,
        _collSurplusPool.address,
        _priceFeed.address,
        _rusdToken.address,
        _sortedTroves.address,
        _lqtyToken.address,
        _lqtyStaking.address,
    );
    await troveManagerSetAddressTx.wait();
    console.log("troveManagerSetAddressTx: ", troveManagerSetAddressTx.hash);

    const activePoolsSetAddressTx = await _activePool.setAddresses(
        _borrowerOperations.address,
        _troveManager.address,
        _stabilityPool.address,
        _defaultPool.address,
    );
    await activePoolsSetAddressTx.wait();
    console.log("activePoolsSetAddressTx: ", activePoolsSetAddressTx.hash);

    const defaultPoolSetAddressTx = await _defaultPool.setAddresses(
        _troveManager.address,
        _activePool.address,
    );
    await defaultPoolSetAddressTx.wait();
    console.log("defaultPoolSetAddressTx: ", defaultPoolSetAddressTx.hash);

    const stabilityPoolTx = await _stabilityPool.setAddresses(_borrowerOperations.address,
        _troveManager.address,
        _activePool.address,
        _rusdToken.address,
        _sortedTroves.address,
        _priceFeed.address,
        _communityIssuance.address,
    );
    await stabilityPoolTx.wait();
    console.log("stabilityPoolTx: ", stabilityPoolTx.hash)

    const collSurplusPoolTx = await _collSurplusPool.setAddresses(
        _borrowerOperations.address,
        _troveManager.address,
        _activePool.address,
    );
    await collSurplusPoolTx.wait();
    console.log("collSurplusPoolTx: ", collSurplusPoolTx.hash)

    const sortedTrovesTx = await _sortedTroves.setParams(
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        _troveManager.address,
        _borrowerOperations.address,
    );
    await sortedTrovesTx.wait();
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
        _rusdToken.address,
        _lqtyStaking.address,
    );
    await borrowerOperationsTx.wait();
    console.log("borrowerOperationsTx: ", borrowerOperationsTx.hash);

    const communityIssuanceTx = await _communityIssuance.setAddresses(
        _lqtyToken.address,
        _stabilityPool.address,
    );
    await communityIssuanceTx.wait();
    console.log("communityIssuanceTx: ", communityIssuanceTx.hash)

    const hintHelpersTx = await _hintHelpers.setAddresses(
        _sortedTroves.address,
        _troveManager.address,
    );
    await hintHelpersTx.wait();
    console.log("hintHelpersTx: ", hintHelpersTx.hash)

    const lockupContractFactoryTx = await _lockupContractFactory.setLQTYTokenAddress(_lqtyToken.address);
    await lockupContractFactoryTx.wait();
    console.log("lockupContractFactoryTx: ", lockupContractFactoryTx.hash);

    const priceFeedTx = await _priceFeed.updatePrice('1808225102000000000000');
    await priceFeedTx.wait();
    console.log('priceFeedTx: %s', priceFeedTx.hash);

    const unipoolTX = await _unipool.setParams(_lqtyToken.address, lpToken, 60 * 60 * 24 * 7 * 6);
    await unipoolTX.wait();
    console.log('unipoolTX: %s', unipoolTX.hash);

    const lqtyTokenDeploymentTime = await _lqtyToken.getDeploymentStartTime();
    console.log('lqtyTokenDeploymentTime: ', lqtyTokenDeploymentTime.toNumber());
    result.deploymentDate = lqtyTokenDeploymentTime.toNumber();

    const bootstrapPeriod = await _troveManager.BOOTSTRAP_PERIOD();
    console.log('bootstrapPeriod: ', bootstrapPeriod.toNumber());
    result.bootstrapPeriod = bootstrapPeriod.toNumber();

    const totalStabilityPoolLQTYReward = await _communityIssuance.LQTYSupplyCap();
    console.log('totalStabilityPoolLQTYReward: ', Decimal.fromBigNumberString(totalStabilityPoolLQTYReward.toHexString()).toString());
    result.totalStabilityPoolLQTYReward = Decimal.fromBigNumberString(totalStabilityPoolLQTYReward.toHexString()).toString();

    const liquidityMiningLQTYRewardRate = await _unipool.rewardRate();
    console.log('liquidityMiningLQTYRewardRate: ', Decimal.fromBigNumberString(liquidityMiningLQTYRewardRate).toString());
    result.liquidityMiningLQTYRewardRate = Decimal.fromBigNumberString(liquidityMiningLQTYRewardRate).toString();
    console.log('startBlockNumber: ', startBlockNumber);

    console.log("//==================================================================================================================")

    console.log(JSON.stringify(result, null, 2));

}