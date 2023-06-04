import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings.js";
import { Utils } from "alchemy-sdk";
import { Link } from "react-router-dom";

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

  // TODO: Loading animation
  if (!blockData) {
    return <p className="text-center my-4">Loading...</p>;
  }

  if (blockData) {
    return (
      <div className="container mx-auto justify-between items-center flex py-4 px-5 my-5 border border-dotted border-cyan-500 md:w-2/3 rounded shadow-inner">
        <div>
          <Link
            to={`/${blockData.number}`}
            className="text-blue-500  hover:text-blue-700 hover:text-bold"
          >
            Block: {blockData.number}
          </Link>
          <p className="text-xs italic">
            {timeNow - blockData.timestamp ?? ""} secs ago
          </p>
        </div>
        <div>
          <p>Fee recipient: {getShortAddress(blockData.miner)}</p>
          <p>Txns: {blockData.transactions.length}</p>
        </div>
      </div>
    );
  }
}
