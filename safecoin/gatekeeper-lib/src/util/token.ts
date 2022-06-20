import { Connection, PublicKey } from "@safecoin/web3.js";
import {
  Account,
  getAccount,
} from "@safecoin/safe-token";
import { GatewayToken } from "@j0nnyboi/safecoin-gateway-ts";

export const gatewayTokenInfo = async (
  connection: Connection,
  tokenAccount: PublicKey
): Promise<Account> => getAccount(connection, tokenAccount);

export const prettyPrint = (token: GatewayToken): string =>
  JSON.stringify(
    {
      issuingGatekeeper: token.issuingGatekeeper.toBase58(),
      gatekeeperNetwork: token.gatekeeperNetwork.toBase58(),
      owner: token.owner.toBase58(),
      state: token.state,
      publicKey: token.publicKey.toBase58(),
      programId: token.programId.toBase58(),
      expiryTime: token.expiryTime,
    },
    null,
    1
  );
