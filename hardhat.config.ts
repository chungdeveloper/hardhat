import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('@openzeppelin/hardhat-upgrades');

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {},
        development: {
            url: 'http://127.0.0.1:8545',
            accounts: ['0x7abcb7a752746dc534d8f79294fac8308bc31e3967d560f504a828209aed9d3d']
        },
        quorum: {
            url: 'http://127.0.0.1:22000'
        },
        testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            gasPrice: 20000000000,
            accounts: ['0x7abcb7a752746dc534d8f79294fac8308bc31e3967d560f504a828209aed9d3d']
        },
        mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            gasPrice: 20000000000,
            accounts: ['0x7abcb7a752746dc534d8f79294fac8308bc31e3967d560f504a828209aed9d3d']
        }
    },

    solidity: "0.8.17",

    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts'
    },
    mocha: {
        timeout: 20000
    }
};

export default config;
