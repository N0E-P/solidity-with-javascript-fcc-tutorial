import { Modal, Input } from "web3uikit"
import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"

export default function UpdateListingModal({ nftAddress, tokenId, isVisible }) {
	const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)
	const { runContractFunction: updateListing } = useWeb3Contract({
		abi: nftMarketplaceAbi,
	})

	return (
		<Modal isVisible={isVisible}>
			<Input
				label="Update listing price in L1 Currency (ETH)"
				name="new listing price"
				type="number"
				onChange={(event) => {
					setPriceToUpdateListingWith(event.target.value)
				}}
				onOk={() => {}}
			/>
		</Modal>
	)
}
