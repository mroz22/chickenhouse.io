import AWS from 'aws-sdk'
import NodeWebcam from "node-webcam";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_accessKeyId,
  secretAccessKey: process.env.S3_secretAccessKey
})

//Default options

var opts = {
  //Picture related
  width: 1280,
  height: 720,
  quality: 100,
  // Number of frames to capture
  // More the frames, longer it takes to capture
  // Use higher framerate for quality. Ex: 60
  frames: 60,
  //Delay in seconds to take shot
  //if the platform supports miliseconds
  //use a float (0.1)
  //Currently only on windows
  delay: 0,
  //Save shots in memory
  saveShots: true,
  // [jpeg, png] support varies
  // Webcam.OutputTypes
  output: "jpeg",
  //Which camera to use
  //Use Webcam.list() for results
  //false for default device
  device: false,
  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes
  callbackReturn: "buffer",
  //Logging
  verbose: true,
};

//Creates webcam instance




// @ts-nocheck
// todo

import { Module } from "./module";

export class Webcam extends Module {

  constructor({ id, dataRef }) {

    const onStateChange = (state) => {
    };

    super({ id, dataRef, onStateChange });


    setInterval(() => {
      NodeWebcam.list(async (list) => {
        //Use another device
        console.log(list);

        for (let device of list) {
          let cam = NodeWebcam.create({ ...opts, device });
          const key = Date.now() + device.replaceAll("/", "-");
          await cam.capture(
            Date.now() + device.replaceAll("/", "-"),
            async (err, data) => {
              if (data) {
                await s3.upload({
                  Bucket: 'chicken-citadel',
                  Key: `${key}.jpg`,
                  Body: data,
                }).promise()
              } else {
                console.log('err', err);
              }
            }
          );
        }
      }, 1000 * 60)
    });



    this.init();
  }
}

