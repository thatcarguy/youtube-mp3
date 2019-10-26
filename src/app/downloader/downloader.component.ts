import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DownloaderService } from './downloader.service';
import { Link } from '../model/link';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.css']
})
export class DownloaderComponent implements OnInit {

  videoUrl = '';
  constructor(private service: DownloaderService) { }

  ngOnInit() {
  }

  onDownloadVideo(postForm: NgForm) {
    console.log(postForm);
    const linkObj = new Link();
    linkObj.videoLink = postForm.value.url;
    this.service.downloadFile(linkObj);
  }

}
