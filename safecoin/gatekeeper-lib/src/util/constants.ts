import { Commitment, PublicKey } from "@safecoin/web3.js";

export const REGISTER = "./register.csv";

// Should equal the contents of safecoin/program/program-id.md
export const PROGRAM_ID: PublicKey = new PublicKey(
  "gatem74V238djXdzWnJf94Wo1DcnuGkfijbf3AuBhfs"
);
export const safecoin_COMMITMENT: Commitment = "confirmed";
