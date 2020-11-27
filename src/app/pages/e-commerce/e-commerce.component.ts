import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  // @Input() txList: {name: string; title: string}[];

  @Input() users: { name: string, title: string }[] = [
    { name: '初始化数据', title: '0x3fdc0589000bb11fdc7b7e539467d33cda2b5e25d30bec0ce5f230eadd11ab16' },
    { name: '请求授权', title: '0x1e5e3185de79dba4760a662c85f319f161961a67010662f4046db080e5f0ed2c' },
    { name: '管理员授权', title: '0xd4f99f1029a1aaca89fabf9a69a22ab4de7e9badccedb573928aa3636f368893' },
    { name: '获取数据', title: '0x26ae847768600953915fd43f19f1903eda93a5a8f12d3d604e058430c92b7b1b' },
    { name: '修改数据', title: '0x5ac77c642fd16f2c88207bea2db4a084210e86ac92e716fa79caa0106ceeb980' },
  ];
}
