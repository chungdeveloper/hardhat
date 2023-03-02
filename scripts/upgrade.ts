const {ethers, upgrades} = require("hardhat");
import {HardHatContract__factory, HardHatContractV2,} from "../typechain-types";

async function main() {
    // const [alex, jackson, jessica, deployed] = await ethers.getSigners();
    // console.log("getIOwner: ", deployed.address)
    // const HardHatContractV2 = (await ethers.getContractFactory("HardHatContractV2", deployed))
    // // const contractDeploy = await HardHatContract.deploy()
    // const contractDeployV2 = await upgrades.upgradeProxy('0xCE3478A9E0167a6Bc5716DC39DbbbfAc38F27623', HardHatContractV2);
    // // await contractDeployV2.deployed();
    // await contractDeployV2.addBalance({value: "1000"})
    // console.log("HardHatContractV2 getBalanceOf: ", await contractDeployV2.getBalanceOf())
    // console.log("HardHatContractV2 total balance: ", await contractDeployV2.getTotalBalance())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
