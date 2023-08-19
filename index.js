const Jimp = require("jimp");
const fs = require("fs");
const width = 1280;
const height = 720;
const frameRate = 24;
const quality = 25;
const colorTolerance = 180;
const inputFile = `${__dirname}/zip/converted.zip`;
const ffmpeg = require("fluent-ffmpeg");
const AdmZip = require("adm-zip");
const { resolve } = require("path");
const { rejects } = require("assert");
const createZipArchive = async () => {
  return new Promise((resolve, rejects) => {
    const zip = new AdmZip();
    const outputFile = `${__dirname}/zip/converted.zip`;
    zip.addLocalFolder(`${__dirname}/upload`);
    zip.writeZip(outputFile);
    console.log(`Created zip successfully`);
    resolve();
  });
};
const binaryToBuffer = (binaryString) => {
  const byteCount = Math.ceil(binaryString.length / 8);
  const buffer = Buffer.alloc(byteCount);

  for (let i = 0; i < byteCount; i++) {
    const byteStart = i * 8;
    const byteEnd = byteStart + 8;
    const byteBinary = binaryString.slice(byteStart, byteEnd);
    buffer.writeUInt8(parseInt(byteBinary, 2), i);
  }

  return buffer;
};
const processBinaryDataInChunks = (fileData, chunkSize) => {
  const binaryChunks = [];
  for (let i = 0; i < fileData.length; i += chunkSize) {
    const chunk = fileData.slice(i, i + chunkSize);
    let binaryChunk = "";
    for (const byte of chunk) {
      const byteBinary = byte.toString(2).padStart(8, "0");
      binaryChunk += byteBinary;
    }
    binaryChunks.push(binaryChunk);
  }
  return binaryChunks.join("");
};
const fileToImages = async () => {
  return new Promise((resolve, reject) => {
    console.log("File to Image conversion started");
    const startTime = process.hrtime();
    var stream = fs.createReadStream(inputFile);
    var imageNumber = 1;
    var processing = false;
    const byteSize = ((height * width) / 16) * 0.125;
    stream.on("readable", function () {
      if (processing) {
        return;
      }

      var chunk = stream.read(byteSize);
      if (chunk) {
        processing = true;
        const binaryString = processBinaryDataInChunks(chunk, byteSize);
        const lengthOfBinary = binaryString.length;
        let ind = 0;
        const image = new Jimp(width, height);

        for (let y = 0; y < height / 4; y++) {
          for (let x = 0; x < width / 4; x++) {
            let color;

            if (ind < lengthOfBinary) {
              if (binaryString[ind] === "1") {
                color = 0x000000ff;
              } else {
                color = 0xffffffff;
              }
              image.setPixelColor(color, x * 4, y * 4);
              image.setPixelColor(color, x * 4, y * 4 + 1);
              image.setPixelColor(color, x * 4, y * 4 + 2);
              image.setPixelColor(color, x * 4, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 1, y * 4);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 2, y * 4);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 3, y * 4);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 3);

              ind++;
            } else {
              color = 0xff0000ff;
              image.setPixelColor(color, x * 4, y * 4);
              image.setPixelColor(color, x * 4, y * 4 + 1);
              image.setPixelColor(color, x * 4, y * 4 + 2);
              image.setPixelColor(color, x * 4, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 1, y * 4);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 2, y * 4);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 3, y * 4);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 3);
            }
          }
        }
        const outputFilePath = `${__dirname}/images/output${imageNumber}.png`;
        image.write(outputFilePath, (err) => {
          if (err) {
            reject(err);
          } else {
            imageNumber++;
            processing = false;
            processNextChunk();
          }
        });
      }
    });

    function processNextChunk() {
      var chunk = stream.read(byteSize);
      if (chunk) {
        processing = true;
        const binaryString = processBinaryDataInChunks(chunk, byteSize);
        const lengthOfBinary = binaryString.length;
        let ind = 0;
        const image = new Jimp(width, height);

        for (let y = 0; y < height / 4; y++) {
          for (let x = 0; x < width / 4; x++) {
            let color;

            if (ind < lengthOfBinary) {
              if (binaryString[ind] === "1") {
                color = 0x000000ff;
              } else {
                color = 0xffffffff;
              }
              image.setPixelColor(color, x * 4, y * 4);
              image.setPixelColor(color, x * 4, y * 4 + 1);
              image.setPixelColor(color, x * 4, y * 4 + 2);
              image.setPixelColor(color, x * 4, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 1, y * 4);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 2, y * 4);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 3, y * 4);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 3);

              ind++;
            } else {
              color = 0xff0000ff;
              image.setPixelColor(color, x * 4, y * 4);
              image.setPixelColor(color, x * 4, y * 4 + 1);
              image.setPixelColor(color, x * 4, y * 4 + 2);
              image.setPixelColor(color, x * 4, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 1, y * 4);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 1, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 2, y * 4);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 2, y * 4 + 3);
              //-->
              image.setPixelColor(color, x * 4 + 3, y * 4);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 1);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 2);
              image.setPixelColor(color, x * 4 + 3, y * 4 + 3);
            }
          }
        }

        const outputFilePath = `${__dirname}/images/output${imageNumber}.png`;
        image.write(outputFilePath, (err) => {
          if (err) {
            reject(err);
          } else {
            imageNumber++;
            processing = false;
            processNextChunk();
          }
        });
      } else {
        const endTime = process.hrtime(startTime);
        const elapsedSeconds = endTime[0] + endTime[1] / 1e9;
        console.log(
          `Process completed in ${elapsedSeconds.toFixed(2)} seconds`
        );
        resolve();
      }
    }

    stream.on("error", (error) => {
      reject(error);
    });
  });
};
const imagesToFile = async (imageFolder, colorTolerance) => {
  const startTime = process.hrtime();
  console.log(
    "Extracted images to file conversion started, it may take some time."
  );
  const imageFiles = fs.readdirSync(imageFolder);
  const writeStream = fs.createWriteStream(`${__dirname}/output/output.zip`);
  const chunkSize = 1024;

  for (let fileNumber = 1; fileNumber <= imageFiles.length; fileNumber++) {
    const imagePath = `${imageFolder}/output${fileNumber}.png`;
    try {
      const image = await Jimp.read(imagePath);
      let binaryString = "";
      for (let y = 0; y < image.bitmap.height; y += 4) {
        for (let x = 0; x < image.bitmap.width; x += 4) {
          const color = image.getPixelColor(x, y);
          const isNearWhite = isColorNear(color, 0xffffffff, colorTolerance);
          const isNearBlack = isColorNear(color, 0x000000ff, colorTolerance);

          if (isNearBlack) {
            binaryString += "1";
          } else if (isNearWhite) {
            binaryString += "0";
          }
        }
      }

      // Convert binary string to buffer and write in chunks
      for (let i = 0; i < binaryString.length; i += chunkSize) {
        const chunk = binaryString.slice(i, i + chunkSize);
        const buffer = binaryToBuffer(chunk);
        writeStream.write(buffer);
      }
    } catch (err) {
      console.error("Error reading the image:", err);
    }
  }

  writeStream.end();

  writeStream.on("finish", () => {
    const endTime = process.hrtime(startTime);
    const elapsedSeconds = endTime[0] + endTime[1] / 1e9;
    console.log(`Process completed in ${elapsedSeconds.toFixed(2)} seconds`);
  });

  writeStream.on("error", (err) => {
    console.error("Error writing to the stream:", err);
  });
};
const isColorNear = (colorA, colorB, tolerance) => {
  const redDiff = Math.abs(Jimp.intToRGBA(colorA).r - Jimp.intToRGBA(colorB).r);
  const greenDiff = Math.abs(
    Jimp.intToRGBA(colorA).g - Jimp.intToRGBA(colorB).g
  );
  const blueDiff = Math.abs(
    Jimp.intToRGBA(colorA).b - Jimp.intToRGBA(colorB).b
  );

  return (
    redDiff <= tolerance && greenDiff <= tolerance && blueDiff <= tolerance
  );
};
const createVideoFromImages = (
  imageFolderPath,
  outputVideoPath,
  frameRate,
  videoWidth,
  videoHeight,
  videoCodec = "libx264",
  videoQuality
) => {
  const startTime = process.hrtime();
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(`${imageFolderPath}/output%d.png`)
      .inputOptions(["-framerate " + frameRate])
      .outputOptions([
        "-s " + videoWidth + "x" + videoHeight,
        "-c:v " + videoCodec,
        "-b:v 1M",
        "-crf " + videoQuality,
      ])
      .output(outputVideoPath)
      .on("start", (commandLine) => {
        console.log("Images to Video conversion started");
      })
      .on("end", () => {
        const endTime = process.hrtime(startTime);
        const elapsedSeconds = endTime[0] + endTime[1] / 1e9;
        console.log(
          `Process completed in ${elapsedSeconds.toFixed(2)} seconds`
        );
        resolve();
      })
      .on("error", (err) => {
        console.error("Error creating video:", err);
        reject(err);
      })
      .run();
  });
};
const extractFramesFromVideo = (
  inputVideoPath,
  outputFolderPath,
  frameRate
) => {
  const startTime = process.hrtime();
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputVideoPath)
      .outputOptions(["-vf fps=" + frameRate])
      .output(`${outputFolderPath}/output%d.png`)
      .on("end", () => {
        const endTime = process.hrtime(startTime);
        const elapsedSeconds = endTime[0] + endTime[1] / 1e9;
        console.log(
          `Process completed in ${elapsedSeconds.toFixed(2)} seconds`
        );
        resolve();
      })
      .on("start", (progress) => {
        console.log("Video to Frame Conversion started");
      })
      .on("error", (err) => {
        console.error("Error extracting frames:", err);
        reject(err);
      })
      .run();
  });
};
const clearUploadDir = () => {
  return new Promise((resolve, rejects) => {
    const removeUpload = fs.readdirSync(`${__dirname}/upload`);
    removeUpload.forEach((e) => {
      fs.unlinkSync(`${__dirname}/upload/${e}`);
    });
    resolve();
  });
};
const clearDirStepOne = () => {
  return new Promise((resolve, rejects) => {
    const imageDir = fs.readdirSync(`${__dirname}/images`);
    imageDir.forEach((element) => {
      fs.unlinkSync(`${__dirname}/images/${element}`);
    });
    fs.unlinkSync(`${__dirname}/zip/converted.zip`);
    resolve();
  });
};
const clearDirStepTwo = () => {
  return new Promise((resolve, rejects) => {
    fs.unlinkSync(`${__dirname}/uploadedVideo/outputVideo.mp4`);
    resolve();
  });
};
const clearDirStepTwoMid = () => {
  return new Promise((resolve, rejects) => {
    const frameDir = fs.readdirSync(`${__dirname}/frames`);
    frameDir.forEach((element) => {
      fs.unlinkSync(`${__dirname}/frames/${element}`);
    });
    resolve();
  });
};
const convertFileToVideo = async () => {
  await createZipArchive();
  await clearUploadDir();
  await fileToImages()
    .then()
    .catch((err) => console.log(err));
  await createVideoFromImages(
    `${__dirname}/images`,
    `${__dirname}/video/outputVideo.mp4`,
    frameRate,
    width,
    height,
    "libx264",
    quality
  )
    .then(() => {})
    .catch((error) => {
      console.error("Video creation failed:", error);
    });
  await clearDirStepOne();
};
const convertVideoToFile = async () => {
  await extractFramesFromVideo(
    `${__dirname}/uploadedVideo/outputVideo.mp4`,
    `${__dirname}/frames`,
    frameRate
  )
    .then(async () => {
      await clearDirStepTwo();
      await imagesToFile(`${__dirname}/frames`, colorTolerance);
      await clearDirStepTwoMid();
    })
    .catch((error) => {
      console.error("Frame extraction failed:", error);
    });
};
const processTest = async () => {
  await convertFileToVideo();
  await convertVideoToFile();
};
//to test the working of this code just replace video folder name in file to video function to uploadedVideo and uncomment the function processTest given below.
//processTest();
