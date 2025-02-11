import { Connection, Keypair, PublicKey } from "@safecoin/web3.js";
import { ExtendedCluster, getClusterUrl, getConnection } from "../connection";
import { airdropTo } from "../account";
import { GatekeeperService } from "../../service";

export const getTokenUpdateProperties = async (
  args: { [p: string]: any },
  flags: {
    gatekeeperNetworkKey: PublicKey | undefined;
    help: void;
    cluster: ExtendedCluster | undefined;
    gatekeeperKey: Keypair | undefined;
  }
): Promise<{
  gatewayToken: PublicKey;
  gatekeeper: Keypair;
  service: GatekeeperService;
}> => {
  const gatewayToken: PublicKey = args.gatewayToken as PublicKey;
  const gatekeeper = flags.gatekeeperKey as Keypair;
  const gatekeeperNetwork = flags.gatekeeperNetworkKey as PublicKey;

  const connection = getConnectionFromEnv(flags.cluster);
  await airdropTo(connection, gatekeeper.publicKey, flags.cluster as string);
  const service = new GatekeeperService(
    connection,
    gatekeeperNetwork,
    gatekeeper
  );
  return { gatewayToken, gatekeeper, service };
};

/**
 * If safecoin_CLUSTER_URL is set, create a connection to it
 * Otherwise, create a connection to the passed-in cluster
 * @param cluster ExtendedCluster
 *
 * @returns Connection
 */
export const getConnectionFromEnv = (cluster?: ExtendedCluster): Connection => {
  if (process.env.safecoin_CLUSTER_URL)
    return getConnection(process.env.safecoin_CLUSTER_URL);

  if (!cluster)
    throw new Error("Either pass a cluster or set safecoin_CLUSTER_URL");

  return getConnection(getClusterUrl(cluster));
};
