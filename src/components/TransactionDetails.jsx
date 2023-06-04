import { Link, useNavigate, useParams } from "react-router-dom";
import { alchemySDK } from "../utils/alchemy-settings";
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";

export default function TransactionDetails() {
  const { txhash } = useParams();
  const nav = useNavigate();
  const [txData, setTxData] = useState(null);

  useEffect(() => {
    async function getTransactionDetails() {
      const data = await alchemySDK.core.getTransactionReceipt(txhash);
      setTxData(data);
    }
    getTransactionDetails();
  }, []);

  if (!txData) {
    return <p>Loading...</p>;
  }

  if (txData) {
    const gasPriceGwei = Utils.formatUnits(txData.effectiveGasPrice, "gwei");
    const gasPriceEth = Utils.formatUnits(txData.effectiveGasPrice, "ether");

    const gasUsedNum = txData.gasUsed.toNumber();
    const fee = gasUsedNum * gasPriceEth;

    return (
      <div className="px-5 container mx-auto max-w-5xl">
        <div className="text-center mb-5">
          <h1 className="text-xl ">Transaction Details</h1>
          <p
            className="text-xs cursor-pointer hover:font-medium"
            onClick={() => nav(-1)}
          >
            Back to transaction list
          </p>
        </div>
        <div className="border border-blue-200 shadow rounded-xl p-3 px-5">
          <div className="md:flex mb-3">
            <p className="text-neutral-500 md:w-1/3">Transaction Hash</p>
            <p className="text-sm break-words">{txData.transactionHash}</p>
          </div>
          <div className="md:flex my-3">
            <p className="text-neutral-500 md:w-1/3">Confirmations</p>
            <p className="text-sm">{txData.confirmations}</p>
          </div>
          <div className="md:flex my-3">
            <p className="text-neutral-500 md:w-1/3">Status</p>
            <p className="text-sm">
              {txData.status === 1 ? "Success" : "Failure"}
            </p>
          </div>
          <hr />
          <div className="md:flex my-3">
            <p className="text-neutral-500 md:w-1/3">From</p>
            <p className="text-sm">{txData.from}</p>
          </div>
          <div className="md:flex my-3">
            <p className="text-neutral-500 md:w-1/3">To</p>
            <p className="text-sm">{txData.to}</p>
          </div>
          <hr />
          <div className="md:flex my-3">
            <p className="text-neutral-500 md:w-1/3">Gas Price</p>
            <p className="text-sm">{gasPriceGwei} gwei</p>
          </div>
          <div className="md:flex my-3">
            <p className="text-neutral-500 md:w-1/3">Tx Fee</p>
            <p className="text-sm">{fee} ETH</p>
          </div>
        </div>
      </div>
    );
  }
}
