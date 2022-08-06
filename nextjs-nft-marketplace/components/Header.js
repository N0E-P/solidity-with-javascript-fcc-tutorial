import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
	return (
		<nav>
			<h1 className="py-4 px-4 font-bold text-3xl">NFT</h1>
			<div>
				<Link href="/">
					<a>NFT Marketplace</a>
				</Link>
				<Link href="sell-nft">
					<a>Sell NFT</a>
				</Link>
				<ConnectButton />
			</div>
		</nav>
	)
}
