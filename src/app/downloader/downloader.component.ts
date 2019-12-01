import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isDownloadReady = false;
  videoTitle = '';
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: DownloaderService) { }

  ngOnInit() {
    this.isLoading = false;
    this.form = this.fb.group({
      url: ['',
            [
              Validators.required,
              Validators.minLength(9),
              Validators.pattern('^(https?\\:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.?be)\\/.+$')
            ]
          ]
    });
  }

  onConvertVideo(postForm: any) {
    this.isLoading = true;
    console.log(postForm);
    const linkObj = new Link();
    linkObj.videoLink = this.parseFileLink(postForm.url);
    this.service.convertFile(linkObj).subscribe((response) => {
      this.isDownloadReady = true;
      this.downloadLink = response.fileName;
      this.videoTitle = response.fileTitle;
      this.isLoading = false;
    });
  }

  onDownloadMp3(): void {
    this.isLoading = true;
    this.service.downloadFile(this.downloadLink).subscribe(response => {
      const blob = new Blob([response], {type: "audio/mpeg"});
      this.isLoading = false;
      console.log(blob);
      saveAs(blob, this.videoTitle);
      this.isDownloadReady = false;

    });


  }



  private parseFileLink(url: string): string {
    console.log(url);
    let fileLink = '';
    if (url.indexOf('=') > -1) {
      fileLink = url.split('=')[1];
    } else {
      fileLink = url.split('be/')[1];
    }
    console.log(fileLink);
    return fileLink;
  }

}
