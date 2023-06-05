import { useParams } from "react-router-dom";
import { alchemySDK } from "../utils/alchemy-settings";
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";
import TokenDetails from "./TokenDetails";

export default function AccountDetails() {
  const { address } = useParams();
  const [ethBalance, setEthBalance] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);

  useEffect(() => {
    async function getAccountData() {
      try {
        setEthBalance(null);
        const ethBalance = await alchemySDK.core.getBalance(address);
        const tokenBalance = await alchemySDK.core.getTokenBalances(address);

        setTokenBalance(tokenBalance);
        setEthBalance({ eth: ethBalance });
      } catch (error) {
        setEthBalance({ error: "There is no such account" });
      }
    }
    getAccountData();
  }, [address]);

  if (!ethBalance) {
    return <div className="container mx-auto mt-5 text-center">Loading...</div>;
  }

  if (ethBalance.error) {
    return (
      <div className="container mx-auto mt-5 text-center">
        {ethBalance.error}
      </div>
    );
  }

  if (ethBalance) {
    const balance = Utils.formatUnits(ethBalance.eth, "ether");
    return (
      <>
        <div className="my-3 py-2">
          <h1 className="text-center text-lg font-bold">
            ETH: {balance.slice(0, 8)}
          </h1>
        </div>
        <div className="px-5 mx-auto">
          <h4 className="text-center text-lg mb-5">Token Balances</h4>
          <div className="overflow-x-auto">
            <table class="table-auto w-full border-spacing-x-10 border-separate">
              <thead>
                <tr className="">
                  <th className="text-left">Asset</th>
                  <th className="text-left">Symbol</th>
                  <th className="text-left">Contract Address</th>
                  <th className="text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {tokenBalance.tokenBalances.slice(0, 20).map((token) => (
                  <TokenDetails token={token} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
