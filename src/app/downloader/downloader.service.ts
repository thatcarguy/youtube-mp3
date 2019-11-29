import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../model/link';


@Injectable()
export class DownloaderService {

  constructor (private http: HttpClient) {}

  convertFile(data: Link) :any{
    console.log('inside download service: ' + data);
    const url = 'http://localhost:3030/api/convert';


     return this.http.post<any>(url, data,);


  }
  downloadFile(fileId:string): any {
    console.log("hfff");
    const url = 'http://localhost:3030/api/download/'+fileId;
    const headers = new HttpHeaders();
    try{
      return this.http.get(url,{headers, responseType:'blob' as 'json'});
    }catch(err){
      console.log("fuffufuf");
      return null;
    }
  }
}
