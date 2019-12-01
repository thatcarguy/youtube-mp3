var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const path = require('path');
var Downloader = function() {

    var self = this;
   // const ffmpegPath = path.join("/opt/ffmpeg/ffmpeg-3.4.2-64bit-static/ffmpeg");
    const ffmpegPath = "C:\\Users\\Duke\\Downloads\\ffmpeg-20191025-155508c-win64-static\\ffmpeg-20191025-155508c-win64-static\\bin\\ffmpeg.exe";
    const downloadPath = path.join(__dirname,"downloads");
    //Configure YoutubeMp3Downloader with your settings
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": ffmpegPath,        // Where is the FFmpeg binary located?
        "outputPath": downloadPath,    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 1,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 2000,                // How long should be the interval of the progress reports
        "outputOptions" : ["-af", "silenceremove=1:0:-50dB"] // Additional output options passend to ffmpeg
    });

    self.callbacks = {};

    self.YD.on("finished", function(error, data) {

        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }

    });

    self.YD.on("error", function(error, data) {

        console.error(error + " on videoId " + data);

        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }

    });

};

Downloader.prototype.getMP3 = function(track, callback){

    var self = this;

    // Register callback
    self.callbacks[track.videoId] = callback;
    // Trigger download
    self.YD.download(track.videoId, track.name);

};

module.exports = Downloader;
