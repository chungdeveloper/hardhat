const {ethers, upgrades} = require("hardhat");
import {HardHatContract__factory} from "../typechain-types";

async function main() {
    const [alex, jackson, jessica, deployed] = await ethers.getSigners();

    const HardHatContract = (await ethers.getContractFactory("HardHatContract", deployed)) as HardHatContract__factory
    const contractDeploy = await HardHatContract.deploy()
    await contractDeploy.deployed()
    console.log("ContractHardHat deployed: ", contractDeploy.address)

    await contractDeploy.addBalance({value: "1000"})
    console.log("getBalanceOf deployer: ", await contractDeploy.getBalanceOf())

    console.log("ContractHardHat jackson: ", jackson.address)
    const jackHardHat = HardHatContract__factory.connect(contractDeploy.address, jackson)
    await jackHardHat.addBalance({value: "1234"})

    console.log("getIOwner jackson: ", await jackHardHat.getOwner())
    console.log("getBalanceOf jackson: ", await jackHardHat.getBalanceOf())

    console.log("================================================================")

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
