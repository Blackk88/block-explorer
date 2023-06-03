export interface BlockData {
  hash: string;
  parentHash: string;
  number: number;
  // logsBloom: string;
  timestamp: number;
  nonce: string;
  difficulty: number;
  gasLimit: BigInteger;
  gasUsed: number;
  // size: number;
  miner: string;
  transactions: string[];
}
