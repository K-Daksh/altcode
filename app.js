const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const index = require("./index");
//const script = require("./script");
const app = express();
const PORT = 5000 || process.env.PORT;
app.use(fileUpload());

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/uploadFile", (req, res) => {
  if (req.files && Object.keys(req.files).length !== 0) {
    const uploadedFile = req.files.uploadFile;
    const uploadPath = __dirname + "/upload/" + uploadedFile.name;
    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        //script.showModal();
        res.redirect("/#uploadfile");
      }
    });
  } else res.send("No file uploaded !!");
});
app.get("/convertFilestoVideo", async (req, res) => {
  await index.convertFileToVideo();
  res.redirect("/#tovideo");
});
app.get("/downloadVideo", async (req, res) => {
  res.download(`${__dirname}/video/outputVideo.mp4`, function (err) {
    if (err) {
      console.log(err);
    }
    fs.unlinkSync(`${__dirname}/video/outputVideo.mp4`);
  });
});
app.post("/uploadVideo", (req, res) => {
  if (req.files && Object.keys(req.files).length !== 0) {
    const uploadedFile = req.files.uploadFile;
    const uploadPath = __dirname + "/uploadedVideo/outputVideo.mp4";
    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.redirect("/#uploadVideoid");
      }
    });
  } else res.send("No file uploaded !!");
});
app.get("/convertVideoToFrames", async (req, res) => {
  await index.convertVideoToFile();
  res.redirect("/#downloadFileId");
});
app.get("/downloadFile", (req, res) => {
  res.download(`${__dirname}/output/output.zip`, function (err) {
    if (err) {
      console.log(err);
    }
    fs.unlinkSync(`${__dirname}/output/output.zip`);
  });
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Port started on " + PORT);
});
