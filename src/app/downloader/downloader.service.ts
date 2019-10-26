import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link } from '../model/link';


@Injectable()
export class DownloaderService {

  constructor (private http: HttpClient) {}

  downloadFile(data: Link) {
    console.log('inside download service: ' + data);
    const url = 'http://localhost:3030/api/download';
    return this.http.post<any>(url, data, ).subscribe((responseData) => {
      console.log(responseData.message);
      return null;
    });
  }
}
