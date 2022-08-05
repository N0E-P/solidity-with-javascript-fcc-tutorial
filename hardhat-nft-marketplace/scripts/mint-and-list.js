const { ethers } = require("hardhat")

async function mintAndList() {
	const nftMarkplace = await ethers.getContract("NftMerketplace")
	const basicNft = await ethers.getContract("BasicNft")
	console.log("Minting...")
	const mintTx = await basicNft.minNft()
	const mintTxReceipt = await mintTx.wait(1)
	const tokenId = mintTxReceipt.event[0].args.tokenId
}

mintAndList()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
