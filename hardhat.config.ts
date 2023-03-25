import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('@openzeppelin/hardhat-upgrades');

const {
    deployer,
    acc1,
    acc2,
    acc3,
    acc4,
    acc5,
    acc6,
    acc7,
} = require('./secret.json');

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {},
        development: {
            url: 'http://127.0.0.1:8545'
        },
        quorum: {
            url: 'http://127.0.0.1:22000'
        },
        moonnet: {
            url: 'http://192.168.11.140:8545'
        },
        testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            gasPrice: 20000000000,
            accounts: [
                deployer,
                acc1,
                acc2,
                acc3,
                acc4,
                acc5,
                acc6,
                acc7,
            ]
        },
        mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            gasPrice: 20000000000,
            accounts: [
                deployer,
                acc1,
                acc2,
                acc3,
                acc4,
                acc5,
                acc6,
                acc7,
            ]
        }
    },

    solidity: {
        compilers: [
            {
                version: "0.6.11",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100
                    }
                }
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100
                    }
                }
            }
        ]
    },

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
