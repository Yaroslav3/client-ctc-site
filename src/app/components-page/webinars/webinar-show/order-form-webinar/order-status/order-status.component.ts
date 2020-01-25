import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StartingLoadService} from '../../../../../shared/services/starting-load.service';
import {SearchByIdService} from '../../../../../shared/services/search-by-id.service';
import {StatusLiqPay} from '../../../../../shared/model/statusLiqPay';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  idWebinar: number;
  messageStatus: string;
  constructor(private route: Router,
              private loadingService: StartingLoadService,
              private searchById: SearchByIdService) {
  }
  ngOnInit() {
    this.idWebinar = this.searchById.setWebinarId();
    this.status(this.idWebinar);
  }
  back() {
    this.route.navigate(['webinars']);
  }
  // status LoqPay
  status(id: number) {
    this.loadingService.statusLiqPay(id).subscribe((data: StatusLiqPay) => {
      this.messageStatus = data.message;
      console.log(this.messageStatus);
    });
  }
}
