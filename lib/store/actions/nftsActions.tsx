import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
  createConnectionConfig,
} from "@nfteyez/sol-rayz";

export const getAllNftData = async (owner_key: string) => {
  const connect = createConnectionConfig(clusterApiUrl("devnet"));
  let ownerToken = owner_key;
  const result = isValidSolanaAddress(ownerToken);
  console.log("result", result);
  const nfts: any = await getParsedNftAccountsByOwner({
    publicAddress: ownerToken,
    connection: connect,
    serialization: true,
  });
  return nfts;
};
