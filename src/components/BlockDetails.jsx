import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings.js";
import { Utils } from "alchemy-sdk";
import { Link, useParams } from "react-router-dom";

export default function BlockDetails() {
  const [blockData, setBlockData] = useState(null);
  const [isTxShown, setIsTxShown] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getBlock() {
      const blockData = await alchemySDK.core.getBlockWithTransactions(
        parseInt(id)
      );

      setBlockData(blockData);
    }

    getBlock();
  }, []);

  function showTxs() {
    setIsTxShown((prev) => !prev);
  }

  if (!blockData) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (blockData) {
    const gasPriceGwei = Utils.formatUnits(blockData.baseFeePerGas, "gwei");

    const gasUsedNum = blockData.gasUsed.toNumber();
    const gasSpentPercent = ((gasUsedNum / 30000000) * 100).toFixed(2);

    const burntFees =
      Utils.formatUnits(blockData.baseFeePerGas, "ether") * gasUsedNum;

    const date = new Date(blockData.timestamp * 1000);

    return (
      <>
        <div className="container border mx-auto p-4">
          <div className="flex my-2">
            <p className="text-neutral-400 w-1/3">Block height</p>{" "}
            <p>{blockData.number}</p>
          </div>
          <div className="flex my-2">
            <p className="text-neutral-400 w-1/3">Timestamp</p>
            <p>{date.toLocaleString("en-EU")}</p>
          </div>
          <div className="flex my-2">
            <p className="text-neutral-400 w-1/3">{`Gas Price`}</p>
            <p>{gasPriceGwei} gwei</p>
          </div>
          <div className="flex my-2">
            <p className="text-neutral-400 w-1/3">Gas Used</p>
            <p>
              {gasUsedNum.toLocaleString()} ({gasSpentPercent}%)
            </p>
          </div>
          <div className="flex my-2">
            <p className="text-neutral-400 w-1/3">Burnt Fees</p>
            <p>🔥 {burntFees} ETH</p>
          </div>

          <div className="flex my-2">
            <p className="text-neutral-400 w-1/3">Transactions</p>
            <Link
              to={`/blocks/${id}/transactions`}
              className="text-blue-400 hover:text-blue-600"
            >
              {blockData.transactions.length} Txs
            </Link>
          </div>
        </div>
        {isTxShown && <div>Placeholder for Txs</div>}
      </>
    );
  }
}
