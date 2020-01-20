import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/User.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  user: User;
  text = 'Corporate Training Company';
  constructor(private  state: Store<AppState>) {
  }
  ngOnInit() {
    this.state.select('stateStartApplication', 'footerInfo').subscribe(data => {
      this.user = data;
    });
  }


}
