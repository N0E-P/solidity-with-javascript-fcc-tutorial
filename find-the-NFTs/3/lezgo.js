const Web3 = require("web3");

class TransactionChecker {
  web3;
  /*account;*/

  constructor(/*account*/) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://arb-mainnet.g.alchemy.com/v2/HugmnSwYB8i3iRY5PaBdR0F7lQhNC7We"
      )
    );
    /*this.account = account.toLowerCase();*/
  }

  async getnumber() {
    const result = await this.web3.eth
      .getStorageAt("0xB29eA9ad260B6DC980513bbA29051570b2115110", 777)
      .then(console.log);
    console.log(result);
  }
}

let txChecker = new TransactionChecker(
  process.env.ALCHEMY_ID,
  "0x21a2e1Aa815EC9a088Cc18236631ca1FE7F357e4"
);
txChecker.getnumber();
