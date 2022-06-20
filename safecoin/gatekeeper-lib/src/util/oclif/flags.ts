import { Keypair, PublicKey } from "@safecoin/web3.js";
import { Flags } from "@oclif/core";
import { readKey } from "../account";
import { ExtendedCluster } from "../connection";

// eslint-disable-next-line unicorn/prefer-module
const DIRNAME = __dirname;

export const gatekeeperKeyFlag = Flags.build<Keypair>({
  char: "g",
  parse: readKey,
  default: async () => readKey(`${DIRNAME}/test-gatekeeper.json`),
  description: "The private key file for the gatekeeper authority",
});
export const gatekeeperNetworkKeyFlag = Flags.build<Keypair>({
  char: "n",
  parse: readKey,
  default: async () => readKey(`${DIRNAME}/test-gatekeeper-network.json`),
  description: "The private key file for the gatekeeper authority",
});
export const gatekeeperNetworkPubkeyFlag = Flags.build<PublicKey>({
  char: "n",
  // eslint-disable-next-line @typescript-eslint/require-await
  parse: async (pubkey: string) => new PublicKey(pubkey),
  default: async () =>
    (await readKey(`${DIRNAME}/test-gatekeeper-network.json`)).publicKey,
  description:
    "The public key (in base 58) of the gatekeeper network that the gatekeeper belongs to.",
});
export const clusterFlag = Flags.build<ExtendedCluster>({
  // eslint-disable-next-line @typescript-eslint/require-await
  parse: async (cluster: string) => {
    if (process.env.safecoin_CLUSTER_URL) {
      const error = process.env.safecoin_CLUSTER
        ? new Error("Cannot specify both safecoin_CLUSTER and safecoin_CLUSTER_URL")
        : new Error(
            "Cannot specify the cluster flag if safecoin_CLUSTER_URL is set"
          );
      throw error;
    }

    return cluster as ExtendedCluster;
  },
  options: ["mainnet-beta", "testnet", "devnet", "civicnet", "localnet"],
  char: "c",
  env: "safecoin_CLUSTER",
  default: "mainnet-beta" as ExtendedCluster,
  description:
    "The cluster to target. Alternatively, set the environment variable safecoin_CLUSTER. To override this property with a specific endpoint url, set safecoin_CLUSTER_URL",
});
