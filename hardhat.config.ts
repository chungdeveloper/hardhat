import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('@openzeppelin/hardhat-upgrades');

const {
    deploy,
    acc1,
    acc2,
    acc3,
    acc4,
    acc5,
    acc6,
    acc7,
} = require('./secret.json');

const config: HardhatUserConfig = {
    zksolc: {
        version: "1.3.5",
        compilerSource: "binary",
        settings: {},
    },
    defaultNetwork: 'zkLocal',
    networks: {
        hardhat: {},
        development: {
            url: 'http://127.0.0.1:8545'
        },
        bscTestnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            gasPrice: 20000000000,
            accounts: [
                deploy,
                acc1,
                acc2,
                acc3,
                acc4,
                acc5,
                acc6,
                acc7,
            ]
        },
        bscMainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            gasPrice: 20000000000,
            accounts: [
                deploy,
                acc1,
                acc2,
                acc3,
                acc4,
                acc5,
                acc6,
                acc7,
            ]
        },
        zkLocal: {
            url: "http://localhost:3050",
            ethNetwork: "http://localhost:8545",
            chainId: 270,
            zksync: true,
        },
        zkTestnet: {
            url: "https://zksync2-testnet.zksync.dev",
            ethNetwork: "goerli",
            chainId: 280,
            accounts: [
                deploy,
                acc1,
                acc2,
                acc3,
                acc4,
                acc5,
                acc6,
                acc7,
            ],
            zksync: true,
        },
        zkMainnet: {
            url: "https://mainnet.era.zksync.io",
            chainId: 324,
            accounts: [
                deploy,
                acc1,
                acc2,
                acc3,
                acc4,
                acc5,
                acc6,
                acc7,
            ],
            zksync: true,
        },
    },

    solidity: {
        compilers: [
            {
                version: "0.8.11",
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
