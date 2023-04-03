import {
    OpenOraclePriceData__factory, UniswapAnchoredView__factory
} from "../typechain-types";

const {ethers} = require("hardhat");

async function main() {
    const [deploy] = await ethers.getSigners();
    console.log("deployed: %s", deploy.address);

    console.log("//==================================================================================================================")

    const OpenOraclePriceData = (await ethers.getContractFactory("OpenOraclePriceData", deploy)) as OpenOraclePriceData__factory;
    const _openOraclePriceData = await OpenOraclePriceData.deploy();
    await _openOraclePriceData.deployed();
    console.log("openOraclePriceData: ", _openOraclePriceData.address);


    const UniswapAnchoredView = (await ethers.getContractFactory("UniswapAnchoredView", deploy)) as UniswapAnchoredView__factory;
    const _uniswapAnchoredView = await UniswapAnchoredView.deploy();
    await _uniswapAnchoredView.deployed();
    console.log("uniswapAnchoredView: ", _uniswapAnchoredView.address);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});