import { Connection, Keypair, PublicKey } from "@safecoin/web3.js";
import { safecoin_COMMITMENT } from "../src/util/constants";
import { GatekeeperNetworkService } from "../src";
import { homedir } from "os";
import * as path from "path";

const mySecretKey = require(path.join(
  homedir(),
  ".config",
  "safecoin",
  // gatekeeper network key
  "gatbGF9DvLAw3kWyn1EmH5Nh1Sqp8sTukF7yaQpSc71.json" //"id.json"
));
const myKeypair = Keypair.fromSecretKey(Buffer.from(mySecretKey));

const connection = new Connection(
  "https://api.mainnet-beta.safecoin.org",
  safecoin_COMMITMENT
);

const service = new GatekeeperNetworkService(connection, myKeypair);

const gatekeeperAuthority = new PublicKey(
  "civQnFJNKpRpyvUejct4mfExBi7ZzRXu6U3hXWMxASn"
); //Keypair.generate().publicKey;

(async function () {
  const gatekeeperAccount = await service.addGatekeeper(gatekeeperAuthority).then(sendableDataTx => sendableDataTx.data());

  console.log(gatekeeperAccount.toBase58());
})().catch((error) => console.error(error));
