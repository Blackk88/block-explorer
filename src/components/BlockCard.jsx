import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings.js";
import { ethers } from "ethers";

export default function BlockCard({ block }) {
  const [blockData, setBlockData] = useState(null);

  const timeNow = Math.round(Date.now() / 1000);

  useEffect(() => {
    async function getBlockData() {
      setBlockData(await alchemySDK.core.getBlockWithTransactions(block));
    }
    getBlockData();
  }, [block]);

  function getShortAddress(address) {
    const firstChars = address.slice(0, 6);
    const lastChars = address.slice(-6);

    const shortAddress = `${firstChars}...${lastChars}`;

    return shortAddress;
  }

  return (
    <>
      {!blockData && <p>Loading...</p>}
      {blockData && (
        <div>
          <h1>Block Information:</h1>
          <p>Number: {blockData.number}</p>
          <p>Fee recipient: {getShortAddress(blockData.miner)}</p>

          <p>Time since: {timeNow - blockData.timestamp ?? ""}</p>
          <p>Txns: {blockData.transactions.length}</p>
        </div>
      )}
    </>
  );
}
