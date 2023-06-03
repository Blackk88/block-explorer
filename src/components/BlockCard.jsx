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
        <div>
          <p>Number: {blockData.number}</p>
          <p>Fee recipient: {getShortAddress(blockData.miner)}</p>
          <p>Time since: {timeNow - blockData.timestamp ?? ""} secs ago</p>
          <p>Txns: {blockData.transactions.length}</p>

          <p>{`Gas Price: ${gasPriceGwei} gwei`}</p>
          <p>{`Gas Used: ${gasUsedNum} (${gasSpentPercent}%)`}</p>

          <p> {`Burnt Fees: ${burntFees} ETH`}</p>
        </div>
        <hr />
      </>
    );
  }
}
