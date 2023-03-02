import {ethers} from "hardhat";

async function main() {
    const CheckHardHatContract = await ethers.getContractFactory("HardHatContract");
    const checkContractDeploy = await CheckHardHatContract.deploy();
    await checkContractDeploy.deployed();

    console.log("CheckContractHardHat deployed: ", checkContractDeploy.address)
    console.log("getBalanceOf sender: ", await checkContractDeploy.getBalanceOf())
    console.log("getNativeBalanceOf sender: ", await checkContractDeploy.getNativeBalanceOf())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
