// import { Observable } from 'rxjs';
import { Block } from 'web3-eth';

export abstract class BlockchainData {
  abstract getBlockNumber(): Promise<number>;
  abstract getBlock(blockNumber: string|null): Promise<Block>;
  abstract getBlockByNumber(blockNumber: number): Promise<Block>;
  abstract getBlockDiff(blockNumber: string|null): Promise<number>;
}
