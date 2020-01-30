import {Component, OnDestroy, OnInit} from '@angular/core';
import {StartingLoadService} from '../../../../../shared/services/starting-load.service';
import {SearchByIdService} from '../../../../../shared/services/search-by-id.service';
import {StatusLiqPay} from '../../../../../shared/model/statusLiqPay';
import {MainLayoutComponent} from '../../../../../main-layout/main-layout.component';
import {fadingAwayAnimate} from '../../../../../shared/animations/fading-away.animate';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  animations: [fadingAwayAnimate]
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  idWebinar: number;
  messageStatus: string;
  constructor(
    private headerControl: MainLayoutComponent,
    private loadingService: StartingLoadService,
    private searchById: SearchByIdService) {
  }
  ngOnInit() {
    this.headerControl.hiddenHeaderComponent();
    this.idWebinar = this.searchById.setWebinarId();
    this.status(this.idWebinar);
  }
  // status LoqPay
  status(id: number) {
    this.loadingService.statusLiqPay(id).subscribe((data: StatusLiqPay) => {
      this.messageStatus = data.message;
    });
  }
  ngOnDestroy(): void {
    this.headerControl.visibleHeaderComponent();
  }
}
