const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const Downloader = require('./downloader');
const dl = new Downloader();
const filePath = path.join(__dirname,"downloads");

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

app.get('/api/download/:fileId',(req,res,next)=>{
  const fileId = req.params.fileId;
  const fileUrl = path.join(filePath,fileId);
  console.log(fileUrl);
  if(fs.existsSync(fileUrl)){
    console.log("inside download for "+fileId);

    res.download(fileUrl,function(err){
      if(err){
        console.log('error occured');
        console.log(err);
        return;
      }
      fs.unlink(fileUrl,(err)=>{
        if(err){
          console.log("Error deleting the file");
          return;
        }
        console.log("File removed successfully");
      });
    });
  }else{
    res.status(404).json({
      message:"MP3 was not found"
    });
  }
});


/**
 * Look at what I am doing for the page upload about returning the file path etc.
 */
let i = 0;
app.post('/api/convert',(req,res,next)=>{
  console.log(req.body.videoLink);
  const videoLink = req.body.videoLink;
  if(videoLink){
    const fileName = videoLink+".mp3";
    console.log("about to call getMp3");
    dl.getMP3({videoId: videoLink, name:fileName},function(err,response){
      i++;

      if(err){
        console.log("Something went wrong");
        console.log(err);
      }else{
        try{
          console.log("Finished download");
          res.status(200).json({
            fileName: fileName,
            filePath: response.file,
            fileTitle: response.videoTitle,
            message: "Successfully Converted File"
          });
        }catch(err){
          console.log("Error in the res");
          console.log(err);
        }
      }
    });


  }
  else{
    console.log("No video found");
    res.status(404).json({
      message: "No Video Id"
    });
  }

});

module.exports = app;
