import {Injectable} from '@angular/core';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';
import {BlockchainData} from '../data/blockchain-info';
import {Block} from 'web3-eth';


// const RPC_Addr = 'http://localhost:8545';
const RPC_Addr = 'http://139.186.69.17:9555'
const Abi = require('../abi/dataDemo.abi');
const DataDemoAddr = '0xa89aa5833e55e3dae061e17d3d7ed3081f5e491d';
const Coinbase = '0xba123fd802d6767db3eb6f92708a4b8511a66381';

interface DataAPI {
  initData(_info: string, _hash: string, _version: string): void;
  changeData(_info: string, _hash: string, _version: string): void;
  queryNewestData(): void;
  queryHistory(_index: number): void;
}

interface WithAuth extends DataAPI {
  requestRole(): void;
  authorize(): void;
}

@Injectable()
export class BlockChainApiService implements WithAuth {
  private w3: Web3;
  private dataDemo: Contract;
  public constructor(rpc: string|null) {
    this.w3 = new Web3(RPC_Addr);
    this.dataDemo = new this.w3.eth.Contract(Abi, DataDemoAddr);
  }

  async initData(_info: string, _hash: string, _version: string): Promise<void> {
    return await this.dataDemo.methods.InitData(_info, _hash, _version).send({from: Coinbase},
      function (error, txHash) {
        return txHash;
      });
  }

  async changeData(_info: string, _hash: string, _version: string): Promise<void> {
     return await this.dataDemo.methods.ChangeData(_info, _hash, _version).send({from: Coinbase},
       function (error, txHash) {
        return txHash;
     });
  }

  queryHistory(_index: number): void {
    return;
  }

  async queryNewestData(): Promise<void> {
    return await this.dataDemo.methods.QueryNewestData().call();
  }

  requestRole(): void {
    return;
  }

  authorize(): void {
    return;
  }
}


@Injectable()
export class BlockchainInfoService extends BlockchainData {
  private w3: Web3;
  private blockNumber: number;
  public constructor() {
    super();
    this.w3 = new Web3(RPC_Addr);
  }
  async getBlockNumber(): Promise<number> {
    return this.w3.eth.getBlockNumber();
  }

  async getBlockByNumber(blkNumber: number): Promise<Block> {
    return this.w3.eth.getBlock(blkNumber);
  }

  async getBlock(blkNumber: string): Promise<Block> {
    return this.w3.eth.getBlock('latest');
  }

  async getBlockDiff(blkNumber: string): Promise<number> {
    const blk0 = await this.w3.eth.getBlock(blkNumber);
    const blk0Num = blk0.number;
    const blk1 = await this.w3.eth.getBlock(blk0Num - 1);
    return parseInt(<string>blk0.timestamp, 10) - parseInt(<string>blk1.timestamp, 10);
  }



}

