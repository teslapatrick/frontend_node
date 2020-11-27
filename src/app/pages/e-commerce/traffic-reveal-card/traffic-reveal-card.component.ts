import { Component, OnDestroy } from '@angular/core';
import { BlockList, TrafficListData } from '../../../@core/data/traffic-list';
import { TrafficBarData, TrafficBar } from '../../../@core/data/traffic-bar';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficBarData: TrafficBar;
  trafficListData: BlockList[];
  revealed = false;
  period: string = 'week';

  constructor(private trafficListService: TrafficListData,
              private trafficBarService: TrafficBarData) {
    this.getTrafficFrontCardData();
    this.getTrafficBackCardData(this.period);
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string): void {
    this.period = value;

    this.getTrafficFrontCardData();
    this.getTrafficBackCardData(value);
  }

  getTrafficBackCardData(period: string) {
    this.trafficBarService.getTrafficBarData(period)
      .pipe(takeWhile(() => this.alive ))
      .subscribe(trafficBarData => {
        this.trafficBarData = trafficBarData;
      });
  }

  getTrafficFrontCardData() {
    this.trafficListService.getTrafficListData()
      .pipe(takeWhile(() => this.alive))
      .subscribe(trafficListData => {
        this.trafficListData = trafficListData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
