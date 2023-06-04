import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings.js";
import { ethers } from "ethers";
import { Utils } from "alchemy-sdk";

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
    return <p>Loading...</p>;
  }

  if (blockData) {
    const gasPriceGwei = Utils.formatUnits(blockData.baseFeePerGas, "gwei");

    const gasUsedNum = blockData.gasUsed.toNumber();
    const gasSpentPercent = ((gasUsedNum / 30000000) * 100).toFixed(2);

    const burntFees =
      Utils.formatUnits(blockData.baseFeePerGas, "ether") * gasUsedNum;

    return (
      <>
        <div className="container mx-auto justify-between items-center flex border py-4 px-5 my-5 shadow md:w-2/3 rounded">
          <div>
            <p>Block: {blockData.number}</p>
            <p className="text-xs italic">
              {timeNow - blockData.timestamp ?? ""} secs ago
            </p>
          </div>
          <div>
            <p>Fee recipient: {getShortAddress(blockData.miner)}</p>
            <p>Txns: {blockData.transactions.length}</p>
          </div>

          {/* <p>{`Gas Price: ${gasPriceGwei} gwei`}</p>
          <p>{`Gas Used: ${gasUsedNum} (${gasSpentPercent}%)`}</p>

          <p> {`Burnt Fees: ${burntFees} ETH`}</p> */}
        </div>
        {/* <hr /> */}
      </>
    );
  }
}
