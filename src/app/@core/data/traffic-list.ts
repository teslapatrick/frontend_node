import { Observable } from 'rxjs';

// export interface TrafficList {
//   date: string;
//   value: number;
//   delta: {
//     up: boolean;
//     value: number;
//   };
//   comparison: {
//     prevDate: string;
//     prevValue: number;
//     nextDate: string;
//     nextValue: number;
//   };
// }

export interface BlockList {
  blkNum: number;
  blkHash: string;
  date: string|number;
  gasUsed: number;
}

// export abstract class TrafficListData {
//   abstract getTrafficListData(period: string): Observable<TrafficList>;
// }

export abstract class TrafficListData {
  // 「TESLA 修改」 获取最新5个Block的数据
  abstract getTrafficListData(): Observable<BlockList[]>;
}
