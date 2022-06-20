import {PROGRAM_ID} from "@j0nnyboi/safecoin-gateway-ts";
import {Connection, Transaction,} from "@safecoin/web3.js";
import R from "ramda";
import {HashOrNonce} from "./connection";

export const isGatewayTransaction = (transaction: Transaction): boolean => {
  return R.all(R.propEq("programId", PROGRAM_ID), transaction.instructions);
};

export const getOrCreateBlockhashOrNonce = (
  connection: Connection,
  blockhashOrNonce: HashOrNonce | undefined
): Promise<HashOrNonce> => {
  if (blockhashOrNonce) return Promise.resolve(blockhashOrNonce);
  return (
    connection
      .getRecentBlockhash()
      // convert the result to the structure required for HashOrNonce
      .then(({ blockhash }) => ({ recentBlockhash: blockhash }))
  );
};
