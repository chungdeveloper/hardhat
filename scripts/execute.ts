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
import {PromiseOrValue} from "../typechain-types/common";

const {
    troveManager,
    activePool,
    defaultPool,
    _stabilityPool,
    _gasPool,
    collSurplusPool,
    priceFeed,
    sortedTroves,
    borrowerOperations,
    lusdToken,
    communityIssuance,
    lqtyStaking,
    lockupContractFactory,
    lqtyToken,
} = require('../contract_deployed.json');

const {ethers} = require("hardhat");

async function main() {
    const [deployed, bounty, lpRewards, multisig, chungld] = await ethers.getSigners();
    const borrower = await BorrowerOperations__factory.connect(borrowerOperations.address, deployed);
    await borrower.openTrove('1000000000000000000', 1800e18, '0', '0', {value: 3e18});
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});