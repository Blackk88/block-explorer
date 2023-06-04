import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings.js";
import BlockCard from "./BlockCard.jsx";

const BLOCKS_TO_SHOW = 5;

export default function BlockList() {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);
  let arrayOfBlocks = [];

  useEffect(() => {
    async function getBlockNumber() {
      const blockNumber = await alchemySDK.core.getBlockNumber();
      setLatestBlockNumber(blockNumber);
    }
    getBlockNumber();
  }, []);

  if (latestBlockNumber) {
    for (let i = 0; i < BLOCKS_TO_SHOW; i++) {
      arrayOfBlocks.push(latestBlockNumber - i);
    }
  }

  return (
    <>
      <h1 className="text-center text-xl bold ">Latest Blocks</h1>
      {arrayOfBlocks.map((blockNumber) => (
        <BlockCard key={blockNumber} block={blockNumber} />
      ))}
    </>
  );
}
