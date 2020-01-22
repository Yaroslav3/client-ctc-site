import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reduxe';


@Injectable({
  providedIn: 'root'
})
export class LoadingPhotoHeaderService {
  homePhoto;

  constructor(private store: Store<AppState>) {
  }

  setPhotoLoadingHeader(namePhoto) {
    const base64 = 'data:image/jpg;base64,';
    let allPhoto;
    this.store.select('stateStartApplication', 'photoHeader')
      .subscribe(data => {
        // console.log(data);
        allPhoto = data;
        this.homePhoto = allPhoto.filter(img => img.namePage === namePhoto);
        const nameImg = this.homePhoto.map(t => t.photo);
        this.homePhoto =  nameImg;
      });
  }

}
