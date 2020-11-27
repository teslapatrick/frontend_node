import { Observable } from 'rxjs';
import { OrdersChart } from './orders-chart';
import { ProfitChart  } from './profit-chart';

export interface OrderProfitChartSummary {
  title: string;
  type: string;
  value: number;
}

export abstract class OrdersProfitChartData {
  // 「TESLA 修改」修改获取节点数据的接口
  abstract getOrderProfitChartSummary(): Observable<OrderProfitChartSummary[]>;
  abstract getOrdersChartData(period: string): Observable<OrdersChart>;
  abstract getProfitChartData(period: string): Observable<ProfitChart>;
}
