/// <reference types="aws-sdk" />

import AWS from 'aws-sdk'
import { useEffect } from "react";

const s3 = new AWS.S3({
  s3BucketEndpoint: true,
  endpoint: 'http://chicken-citadel.s3-website.eu-central-1.amazonaws.com/',
  accessKeyId: 'AKIA5JTJWBPKRH352NPT',
  secretAccessKey: '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'
})

export const Camera: React.FC<{ options: any }> = ({ options }) => {
  console.log('options camere', options)
  useEffect(() => {
    const load = async () => {
      // setInterval(async () => {
        // fetch('https://bucket.mycompany.com.s3.amazonaws.com/?list-type=2&prefix=parent-dir1/parent-dir2/')
       s3.listBuckets((err, data)=> {
        console.log('----err', err);
        console.log('data-------', data);
       })  ;

    }
    load();
    // }, 60 * 1000);
  }, [])

  return (
    <div>
      camera
    </div>
  )
  // <iframe height="480" width="640" title="indoor" src={options.url}></iframe>
  // <video src={options.url} height="480" width="640" >
  //   <source src={options.url} />
  // </video>
};

export default Camera;
