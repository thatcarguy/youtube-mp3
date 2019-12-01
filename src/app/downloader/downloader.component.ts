import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DownloaderService } from './downloader.service';
import { Link } from '../model/link';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.css']
})
export class DownloaderComponent implements OnInit {

  downloadLink: string;
  videoUrl = '';
  isLoading = false;
  constructor(private service: DownloaderService) { }

  ngOnInit() {
  }

  onConvertVideo(postForm: NgForm) {
    this.isLoading = true;
    console.log(postForm);
    const linkObj = new Link();
    linkObj.videoLink = this.parseFileLink(postForm.value.url);
    // const blob = new Blob([this.service.downloadFile(linkObj)],{type:'audio/mpeg'});
    // saveAs(blob,"test.mp3");
    this.service.convertFile(linkObj).subscribe((response) =>{
      console.log("Hereeeeee");
      this.downloadLink = response.fileName;
      this.isLoading = false;
    });
  }

  onDownloadMp3():void {
    this.isLoading = true;
    this.service.downloadFile(this.downloadLink).subscribe(response =>{
      const blob = new Blob([response],{type:"audio/mpeg"});
      this.isLoading = false;
      console.log(blob);
      saveAs(blob,"test.mp3");

    });


  }



  private parseFileLink(url: string): string {
    console.log(url);
    let fileLink = '';
    if(url.indexOf('=')>-1){
      fileLink = url.split('=')[1];
    }else{
      fileLink = url.split('be/')[1];
    }
    console.log(fileLink);
    return fileLink;
  }

}
