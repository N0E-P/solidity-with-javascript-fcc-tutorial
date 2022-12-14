const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET = process.env.PINATA_API_SECRET
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

async function storeImages(imagesFilePath) {
	const fullImagePath = path.resolve(imagesFilePath)
	const files = fs.readdirSync(fullImagePath)
	console.log(files)
	let responses = []
	console.log("Uploading to IPFS!")
	for (fileIndex in files) {
		const readableStreamForFile = fs.createReadStream(`${fullImagePath}/${files[fileIndex]}`)
		try {
			const response = await pinata.pinFileToIPFS(readableStreamForFile)
			responses.push(response)
		} catch (error) {
			console.log(error)
		}
	}
	return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
	try {
		const response = await pinata.pinJSONToIPFS(metadata)
		return response
	} catch (error) {
		console.log(error)
	}
	return null
}

module.exports = { storeImages, storeTokenUriMetadata }
