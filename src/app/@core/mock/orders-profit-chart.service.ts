import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../data/orders-profit-chart';
import { ProfitChart, ProfitChartData } from '../data/profit-chart';
import {BlockchainData} from '../data/blockchain-info';

@Injectable()
export class OrdersProfitChartService extends OrdersProfitChartData {

  private summary = [
    {
      title: '当前区块高度',
      type: 'blkHeight',
      value: 0,
    },
    {
      title: '当前全网总难度',
      type: 'difficulty',
      value: 0,
    },
    {
      title: '区块间隔',
      type: 'blkPeriod',
      value: 0,
    },
  ];

  constructor(private blockChainInfoService: BlockchainData,
              private ordersChartService: OrdersChartData,
              private profitChartService: ProfitChartData) {
    super();
  }

  getOrderProfitChartSummary(): Observable<OrderProfitChartSummary[]> {
    setInterval(() => {
      this.blockChainInfoService.getBlockNumber().then(blockNumber => this.summary[0].value = blockNumber);
      this.blockChainInfoService.getBlock('latest').then(block => this.summary[1].value = block.totalDifficulty);
      this.blockChainInfoService.getBlockDiff('latest').then(diff => this.summary[2].value = diff);
    }, 5000);

    return observableOf(this.summary);
  }

  getOrdersChartData(period: string): Observable<OrdersChart> {
    return observableOf(this.ordersChartService.getOrdersChartData(period));
  }

  getProfitChartData(period: string): Observable<ProfitChart> {
    return observableOf(this.profitChartService.getProfitChartData(period));
  }
}
