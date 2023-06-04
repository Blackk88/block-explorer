import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { alchemySDK } from "../utils/alchemy-settings";
import { Utils } from "alchemy-sdk";

export default function TransactionsList() {
  const [txsData, setTxsData] = useState([]);
  const { id } = useParams();
  const hexId = Utils.hexlify(parseInt(id));

  useEffect(() => {
    async function getTransactionReceipts() {
      const data = await alchemySDK.core.getTransactionReceipts({
        blockNumber: hexId,
      });
      setTxsData(data.receipts);
    }
    getTransactionReceipts();
  }, []);

  if (!txsData) {
    return <p>Loading...</p>;
  }

  if (txsData) {
    return (
      <div className="container mx-auto px-2">
        <h1 className="text-center font-normal text-xl">
          Transactions in Block <span className="">{id}</span>
        </h1>
        <div className="flex justify-between mt-5 px-3">
          <p>Tx hash</p>
          <p>From</p>
          <p>To</p>
        </div>

        {txsData.map((tx) => (
          <Link
            to={`/transactions/${tx.transactionHash}`}
            key={tx.transactionHash}
            className="flex justify-between text-sm p-2 border my-4 shadow-blue-500 shadow hover:bg-blue-100"
          >
            <p className="text-sm">{tx.transactionHash.slice(0, 20)}...</p>
            <p>{tx.from.slice(0, 6) + "..." + tx.from.slice(-6)}</p>
            <p>{tx.to.slice(0, 6) + "..." + tx.to.slice(-6)}</p>
          </Link>
        ))}
      </div>
    );
  }
}
