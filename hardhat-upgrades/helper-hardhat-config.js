const networkConfig = {
	4: {
		name: "rinkeby",
		vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
		entranceFee: "100000000000000000",
		gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
		subscriptionId: "9015",
		callbackGasLimit: "500000",
		interval: "30",
	},
	31337: {
		name: "hardhat",
		entranceFee: "100000000000000000",
		gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
		callbackGasLimit: "500000",
		interval: "30",
	},
}

const developmentChains = ["hardhat", "localhost"]

const frontEndContractsFile = "../nextjs-smartcontract-lottery/constants/contractAddresses.json"
const frontEndAbiFile = "../nextjs-smartcontract-lottery/constants/abi.json"

module.exports = {
	networkConfig,
	developmentChains,
	frontEndAbiFile,
	frontEndContractsFile,
}
