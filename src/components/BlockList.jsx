import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings.js";
import BlockCard from "./BlockCard.jsx";

export default function BlockList() {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);

  useEffect(() => {
    async function getBlockNumber() {
      setLatestBlockNumber(await alchemySDK.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  console.log("BlockList rendered");

  return <BlockCard block={latestBlockNumber} />;
}
