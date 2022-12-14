require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		localhost: {
			chainId: 31337, //1337 ||
			blockConfirmations: 1,
		},
		hardhat: {
			chainId: 31337,
			blockConfirmations: 1,
		},
		rinkeby: {
			chainId: 4,
			blockConfirmations: 6,
			url: RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			saveDeployments: true,
		},
	},
	solidity: "0.8.7",
	namedAccounts: {
		deployer: {
			default: 0,
		},
		player: {
			default: 1,
		},
	},
	gasReporter: {
		enabled: false,
		currency: "USD",
		outputFile: "gas-report.txt",
		noColors: true,
		// coinmarketcap: process.env.COINMARKETCAP_API_KEY,
	},
	mocha: {
		timeout: 200000,
	},
	etherscan: {
		// yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			rinkeby: ETHERSCAN_API_KEY,
			kovan: ETHERSCAN_API_KEY,
		},
	},
}
