import { SortingType } from "../components/NFT/NFTList";
import { PublicKey } from "@solana/web3.js";
import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { NFTData } from "../components/NFT/NFTList";

const connection = new Connection("mainnet-beta");

export const getTokenMetadata = async (publicKey: PublicKey) => {
  const data = await Metadata.findDataByOwner(connection, publicKey);

  return data.map((el) => {
    return {
      uri: el.data.uri,
      mint: el.mint,
      transactionInfo: { lastTransaction: 1, createdAt: 1 },
    };
  });
};

export const getNFTDetails = async (uri: string) => {
  const { name, image, properties } = await (await fetch(uri)).json();

  return {
    name: name,
    image: image,
    creatorAddress: properties.creators[0].address,
  };
};

export const getTransactionInfo = async (mintAddress: string) => {
  const allSignatures = await connection.getSignaturesForAddress(
    new PublicKey(mintAddress)
  );

  const blockTimes = allSignatures.map(({ blockTime }) => blockTime);

  const lastTransaction = blockTimes[0] || 1;
  const createdAt = blockTimes[blockTimes.length - 1] || 1;

  return { lastTransaction, createdAt };
};

export const changeOrderByBlockTime = (
  data: Array<NFTData>,
  type: SortingType
) => {
  return [...data].sort(
    (a, b) => b.transactionInfo[type] - a.transactionInfo[type]
  );
};

export const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
};
