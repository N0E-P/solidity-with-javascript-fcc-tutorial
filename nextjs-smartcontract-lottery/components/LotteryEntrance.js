import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants/index"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
	const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
	const chainId = parseInt(chainIdHex)
	const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
	let [entranceFee, setEntranceFee] = useState("0")
	let [numPlayers, setNumPlayers] = useState("0")
	let [recentWinner, setRecentWinner] = useState("0")

	const dispatch = useNotification()

	const {
		runContractFunction: enterRaffle,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "enterRaffle",
		params: {},
		msgValue: entranceFee,
	})

	const { runContractFunction: getEntranceFee } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getEntranceFee",
		params: {},
	})

	const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getNumberOfPlayers",
		params: {},
	})

	const { runContractFunction: getRecentWinner } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getRecentWinner",
		params: {},
	})

	async function updateUI() {
		const entranceFeeFromCall = "100000000000000000"
		const numPlayersFromCall = (await getNumberOfPlayers()).toString()
		const recentWinnerFromCall = (await getRecentWinner()).toString()
		setEntranceFee(entranceFeeFromCall)
		setNumPlayers(numPlayersFromCall)
		setRecentWinner(recentWinnerFromCall)
	}

	useEffect(() => {
		if (isWeb3Enabled) {
			updateUI()
		}
	}, [isWeb3Enabled])

	const handleSuccess = async function (tx) {
		await tx.wait(1)
		handleNewNotification(tx)
		updateUI()
	}

	const handleNewNotification = function () {
		dispatch({
			type: "info",
			message: "Transaction Complete!",
			title: "Tx Notification",
			position: "topR",
			icon: "bell",
		})
	}

	return (
		<div className="p-5">
			guten tag, i am a lottery entrance
			{raffleAddress ? (
				<div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
						onClick={async function () {
							await enterRaffle({
								onSuccess: handleSuccess,
								onError: (error) => console.log(error),
							})
						}}
						disabled={isLoading || isFetching}
					>
						{isLoading || isFetching ? (
							<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
						) : (
							"Enter Raffle"
						)}
					</button>
					<div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} </div>
					<div>ETH Players: {numPlayers}</div>
					<div>Recent Winner: {recentWinner}</div>
				</div>
			) : (
				<div>No Raffle Address Detected</div>
			)}
		</div>
	)
}
