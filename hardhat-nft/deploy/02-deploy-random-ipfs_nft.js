const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

const imagesLocation = "./images/randomNft"

const metadataTemplate = {
	name: "",
	description: "",
	image: "",
	attributes: [
		{
			trait_type: "c manifik",
			value: 100,
		},
	],
}

let tokenUris = [
	"ipfs://QmYCgC1NXxo8er2PuWfC89nPhkcDHCt2cDAGYDeYonL1ia",
	"ipfs://Qmd5obyqVUExGWHHeo1nGP75C2D8S8p3JuJ4p3ZU4tdahi",
	"ipfs://QmUKgcnDKRdbNx1BiX22eKuRNhVeinsiLUuUEZJkKNiTzA",
]

const FUND_AMOUNT = "10000000000000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const chainId = network.config.chainId
	//let tokenUris

	if (process.env.UPLOAD_TO_PINATA == "true") {
		tokenUris = await handleTokenUris()
	}

	let vrfCoordinatorV2Address, subscriptionId

	if (developmentChains.includes(network.name)) {
		const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
		vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
		const tx = await vrfCoordinatorV2Mock.createSubscription()
		const txReceipt = await tx.wait(1)
		subscriptionId = txReceipt.events[0].args.subId
		await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
	} else {
		vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2Address
		subscriptionId = networkConfig[chainId].subscriptionId
	}
	log("-------------------------------------------")
	//await storeImages(imagesLocation)

	const args = [
		vrfCoordinatorV2Address,
		subscriptionId,
		networkConfig[chainId].gasLane,
		networkConfig[chainId].callbackGasLimit,
		tokenUris,
		networkConfig[chainId].mintFee,
	]

	const randomIpfsNft = await deploy("RandomipfsNft", {
		from: deployer,
		args: args,
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	})
	log("-----------------------------------------------------------")
	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		log("Verifying...")
		await verify(randomIpfsNft.address, args)
	}
}

async function handleTokenUris() {
	tokenUris = []

	const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
	for (imageUploadResponsesIndex in imageUploadResponses) {
		let tokenUriMetadata = { ...metadataTemplate }
		tokenUriMetadata.name = files[imageUploadResponsesIndex].replace(".png", "")
		tokenUriMetadata.description = `Un sublime ${tokenUriMetadata.name} !`
		tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponsesIndex].IpfsHash}`
		console.log(`Uploading ${tokenUriMetadata.name}...`)
		//store the json to pinata /ipfs
		const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
		tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
	}
	console.log("Token URIs Uploaded! They are:")
	console.log(tokenUris)
	return tokenUris
}

module.exports.tags = ["all", "randomipfs", "main"]
