const express = require('express');
const bodyParser = require('body-parser');
//const Downloader = require('./downloader');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require('fs');
const YD = new YoutubeMp3Downloader({
  "ffmpegPath": "C:\\Users\\Duke\\Downloads\\ffmpeg-20191025-155508c-win64-static\\ffmpeg-20191025-155508c-win64-static\\bin\\ffmpeg.exe",
  "outputPath": "C:\\Users\\Duke\\angularworkspace\\youtube-mp3\\youtube-mp3\\backend\\downloads",    // Where should the downloaded and encoded files be stored?
  "youtubeVideoQuality": "highest",       // What video quality should be used?
  "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
  "progressTimeout": 2000,                // How long should be the interval of the progress reports
  "outputOptions" : ["-af", "silenceremove=1:0:-50dB"] // Additional output options passend to ffmpeg
});
const app = express();

//const dl = new Downloader();
let i = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/api/download',(req,res,next)=>{
  console.log("inside download");
  res.download('./backend/downloads/temp2.mp3');
});
/**
 * Look at what I am doing for the page upload about returning the file path etc.
 */
app.post('/api/convert',(req,res,next)=>{
  console.log(req.body.videoLink);
  const videoId = req.body.videoLink;
  if(videoId){
    const fileName = "temp2.mp3";
    YD.download(videoId,fileName);
    YD.on("finished", function(err,data){
      if(err){
        console.log('wtf error');
        console.log(err);
      }
      //const file = data.file;
      console.log("Finished download");
      try{
        res.status(200).json({
          fileName: fileName,
          message: "Successfully Converted File"
        });
      }catch(err){
        console.log("Error in the res");
        console.log(err);
      }


    });
    YD.on("error",function(error){
      console.log("Lammeeeeeee");
      console.log(error);
           res.status(500).json({
          message:'Post Error'
        });
    });
  }else{
    console.log("No video found");
    res.status(404).json({
      message: "No Video Id"
    });
  }

  // dl.getMP3({videoId:'_GkCJmzXyJA', name:'TestFile.mp3'},function(err, res){
  //   i++;
  //   if(err){
  //     console.log('something wrong');
  //     console.error(err);
  //     res.status(500).json({
  //       message:'Post Error'
  //     });
  //   }else{
  //     console.log("Song "+i+" was downloaded: "+ res.file);
  //     res.status(201).json({
  //       message:'Post success'
  //     });
  //   }
  // });
  // dl.getMP3({videoId:req.body.videoLink, name:'TestFile.mp3'}).then(res=>{
  //   console.log("Song "+i+" was downloaded: "+ res.file);
  //   res.status(201).json({
  //     message:'Post success'
  //   });
  // });
});

module.exports = app;
