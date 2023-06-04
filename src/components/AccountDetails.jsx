import { useParams } from "react-router-dom";
import { alchemySDK } from "../utils/alchemy-settings";
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";

export default function AccountDetails() {
  const { address } = useParams();
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    async function getAccountData() {
      try {
        setAccountData(null);
        const data = await alchemySDK.core.getBalance(address);
        setAccountData(data);
      } catch (error) {
        return <p>There is no such address!</p>;
      }
    }
    getAccountData();
  }, [address]);

  console.log(accountData);
  if (!accountData) {
    return <div>Loading...</div>;
  }

  if (accountData) {
    const balance = Utils.formatUnits(accountData, "ether");
    return <div className="my-5 border">{balance} ETH</div>;
  }
}
