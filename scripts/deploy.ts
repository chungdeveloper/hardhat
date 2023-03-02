const {ethers, upgrades} = require("hardhat");
import {HardHatContract__factory, HardHatContractV2, HardHatContractV2__factory,} from "../typechain-types";

async function main() {
    const [alex, jackson, jessica, deployed] = await ethers.getSigners();

    const HardHatContract = (await ethers.getContractFactory("HardHatContract", deployed)) as HardHatContract__factory
    // const contractDeploy = await HardHatContract.deploy()
    const contractDeploy = await upgrades.deployProxy(HardHatContract, [deployed.address], {initializer: 'initialize'});
    await contractDeploy.deployed();
    console.log("ContractHardHat deployed: ", contractDeploy.address)

    await contractDeploy.addBalance({value: "1000"})
    console.log("getBalanceOf deployer: ", await contractDeploy.getBalanceOf())

    console.log("ContractHardHat jackson: ", jackson.address)
    const jackHardHat = HardHatContract__factory.connect(contractDeploy.address, jackson)
    await jackHardHat.addBalance({value: "1234"})

    console.log("getIOwner jackson: ", await jackHardHat.getOwner())
    console.log("getBalanceOf jackson: ", await jackHardHat.getBalanceOf())

    console.log("===============================Begin upgrade=================================")

    const HardHatContractV2 = (await ethers.getContractFactory("HardHatContractV2", deployed)) as HardHatContractV2__factory
    const contractDeployV2 = await upgrades.upgradeProxy(contractDeploy.address, HardHatContractV2);
    await contractDeployV2.addBalance({value: "1000"});
    const alexHardHatV2 = await HardHatContractV2__factory.connect(contractDeployV2.address, alex);
    const jackHardHatV2 = HardHatContractV2__factory.connect(contractDeployV2.address, jackson)
    await alexHardHatV2.addBalance({value: "1020"});
    console.log("HardHatContractV2 getBalanceOf Alex: ", await alexHardHatV2.getBalanceOf());
    console.log("HardHatContractV2 getBalanceOf Jack: ", await jackHardHatV2.getBalanceOf());
    console.log("HardHatContractV2 total balance: ", await contractDeployV2.getTotalBalance());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
