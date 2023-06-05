import { useEffect, useState } from "react";
import { alchemySDK } from "../utils/alchemy-settings";
import emptyLogo from "../assets/empty-token.webp";

export default function TokenDetails({ token }) {
  const [metadata, setMetadata] = useState(null);

  console.log(token);

  useEffect(() => {
    async function getMetadata() {
      const data = await alchemySDK.core.getTokenMetadata(
        token.contractAddress
      );
      setMetadata(data);
    }
    getMetadata();
  }, [token]);

  if (!metadata) {
    return <div>Loading...</div>;
  }

  if (metadata) {
    return (
      <tr className="text-sm mt-5">
        <td className="flex items-center gap-2 py-2">
          <img
            src={metadata.logo ?? emptyLogo}
            alt={`${metadata.name} logo`}
            className="rounded-full border w-7"
          />
          <p className="text-sm">{metadata.name}</p>
        </td>
        <td>{metadata.symbol}</td>
        <td>{token.contractAddress}</td>
        <td>
          {parseInt(token.tokenBalance, 16) / Math.pow(10, metadata.decimals)}
        </td>
      </tr>
    );
  }
}
