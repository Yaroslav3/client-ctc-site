import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilePdfService {
  private readonly host: string;
  constructor(private http: HttpClient) {
    this.host = environment.host;
  }
  downloadPdq(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this.http.get(`${this.host + environment.apiUrlDownloadPDF}/${id}`,
      {
        headers,
        responseType: 'blob' as 'json'
      });
  }
}
