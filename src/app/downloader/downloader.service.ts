import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../model/link';
import { environment } from '../../environments/environment';

@Injectable()
export class DownloaderService {
  url = environment.apiUrl;
  constructor (private http: HttpClient) {}

  convertFile(data: Link): any {
    console.log('inside download service: ' + data);
    const url = this.url + '/convert';
     return this.http.post<any>(url, data, );
  }
  downloadFile(fileId: string): any {
    console.log('hfff');
    const url = this.url + '/download/' + fileId;
    const headers = new HttpHeaders();
    try {
      return this.http.get(url, {headers, responseType: 'blob' as 'json'});
    } catch (err) {
      console.log('fuffufuf');
      return null;
    }
  }
}
