import {LCDClient,MsgSend, isTxError, Coin, MnemonicKey, MsgInstantiateContract} from '@terra-money/terra.js';

const terra = new LCDClient({
	URL: 'http://localhost:1317',
	chainID: 'localterra'
});

// Create a key out of a Mnemonic

const mk = new MnemonicKey({
	mnemonic: 'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

//Wallet can be created out of any key
const wallet = terra.wallet(mk);

console.log("wallet key is",wallet.key);

// Construct Send transaction

const send = new MsgSend(
  wallet.key.accAddress,
  "terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v",
  { uluna: 1000 }
);

// Sign transaction

const tx = await wallet.createAndSignTx({
    msgs: [send],
    memo: "Hello"
  });

// Broadcast tx and check result

  await terra.tx.broadcast(tx).then((txResult) =>{
    if (isTxError(txResult)) {
        throw new Error(`encountered an error while running the transaction: ${txResult.code} ${txResult.codespace}`);
      }
      console.log("hash is: ",txResult.txhash);
      console.log("height is: ",txResult.height);
    console.log("Logs is: ",txResult.logs[0].eventsByType.message)
}
  );