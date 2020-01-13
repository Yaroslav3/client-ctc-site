import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FontJsonFileService {

  private pathFileJson = './assets/fonts.json';

  constructor(private http: HttpClient) {
  }

  getFontJsonFile() {
    return this.http.get(this.pathFileJson);
  }

}
