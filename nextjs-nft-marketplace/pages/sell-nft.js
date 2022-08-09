import { Form, useNotification } from "web3uikit"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"

export default function Home() {
	const { chainId } = useMoralis()
	const chainString = chainId ? parseInt(chainId).toString() : "31337"
	const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"//networkMapping[chainString].NftMarketplace[0]
	const dispatch = useNotification()

	const { runContractFunction } = useWeb3Contract()

	async function approveAndList(data) {
		console.log("Approving")
		const nftAddress = data.data[0].inputResult
		const tokenId = data.data[1].inputResult
		const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

		const approveOptions = {
			abi: nftAbi,
			contractAddress: nftAddress,
			functionName: "approve",
			params: {
				to: marketplaceAddress,
				tokenId: tokenId,
			},
		}

		await runContractFunction({
			params: approveOptions,
			onSuccess: handleApproveSuccess(nftAddress, tokenId, price),
			onError: (error) => {
				console.log(error)
			},
		})
	}

	async function handleApproveSuccess(nftAddress, tokenId, price) {
		console.log("OK! Now time to list")
		const listOptions = {
			abi: nftMarketplaceAbi,
			contractAddress: marketplaceAddress,
			functionName: "listItem",
			params: {
				nftAddress: nftAddress,
				tokenId: tokenId,
				price: price,
			},
		}

		await runContractFunction({
			params: listOptions,
			onSuccess: () => handleListSuccess(),
			onError: (error) => console.log(error),
		})
	}

	async function handleListSuccess() {
		dispatch({
			type: "success",
			message: "NFT listing",
			title: "NFT listed",
			position: "topR,",
		})
	}

	return (
		<div>
			<Form
				onSubmit={approveAndList}
				data={[
					{
						name: "NFT Address",
						type: "text",
						inputWidth: "50%",
						value: "",
						key: "nftAddress",
					},
					{
						name: "Token Id",
						type: "number",
						value: "",
						key: "tokenId",
					},
					{
						name: "Price (in ETH)",
						type: "number",
						value: "",
						key: "price",
					},
				]}
				title="Sell yout NFT!"
				id="Main Form"
			/>
		</div>
	)
}
