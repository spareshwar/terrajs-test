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

// Construct pool contract
const pool_contract = new MsgInstantiateContract(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    21,
    '{"terraswap_contract":"terra1333veey879eeqcff8j3gfcgwt8cfrg9mq20v6f","collector_contract":"terra1lkccuqgj6sjwjn8gsa9xlklqv4pmrqg9dx2fxc","setup_fee":"0.1","deposit_fee":"0.2","rewards_withdrawal_fee":"0.3","penalty_fee":"0.4","pool_manager":"terra17tv2hvwpg0ukqgd2y5ct2w54fyan7z0zxrm2f9"}',
    {uluna:1000},
    true
  );
// Sign transaction
const tx = await wallet.createAndSignTx({
    msgs: [pool_contract],
    memo: "pool contract created"
  });

//Broadcast transaction and check result

await terra.tx.broadcast(tx).then((txResult) =>{
    if (isTxError(txResult)) {
        throw new Error(`encountered an error while running the transaction: ${txResult.code} ${txResult.codespace}`);
      }
      console.log("hash is: ",txResult.txhash);
      console.log("height is: ",txResult.height);
    console.log("Logs: ",txResult.logs[0].eventsByType.message)
}
  );