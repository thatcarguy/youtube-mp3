import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { DownloaderService } from './downloader/downloader.service';

@NgModule({
  declarations: [
    AppComponent,
    DownloaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [DownloaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
