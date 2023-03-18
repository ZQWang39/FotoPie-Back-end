import { Injectable } from "@nestjs/common";
// import { S3 } from "aws-sdk";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { fromIni } from "@aws-sdk/credential-providers";
import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { formatUrl } from "@aws-sdk/util-format-url";
import { Hash } from "@aws-sdk/hash-node";

////////////////////////////////////////////////////////////////
//I tried many versions of presigned url in S3, but got the same problem: X-Amz-Security-Token missing, Sha256=unsigned.
//version 1
//base on official site in English directions-->Using the AWS SDKs-->Javascript:
//https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html

@Injectable()
export class DownloadService {
  //create presigned URL without client
  async createPresignedUrlWithoutClient({ region, bucket, key }) {
    const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
    const presigner = new S3RequestPresigner({
      // credentials: fromIni(),
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
      },
      sha256: Hash.bind(null, "sha256"),
      region,
    });

    const signedUrlObject = await presigner.presign(new HttpRequest(url));
    return formatUrl(signedUrlObject);
  }

  async generatePresignedUrl(filename: string) {
    const REGION = process.env.BUCKET_REGION;
    const BUCKET = process.env.AWS_BUCKET_NAME_PHOTO;
    const KEY = filename;

    try {
      const noClientUrl = await this.createPresignedUrlWithoutClient({
        region: REGION,
        bucket: BUCKET,
        key: KEY,
      });
      // console.log("noClientUrl", noClientUrl);
      return noClientUrl;
    } catch (err) {
      return err.message;
    }
  }

  //create presigned URL with client
  // async createPresignedUrlWithClient({ region, bucket, key }) {
  //   const client = new S3Client({ region });
  //   const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  //   return getSignedUrl(client, command, { expiresIn: 3600 });
  // }
  // async getWithClientUrl(filename: string) {
  //   const REGION = process.env.BUCKET_REGION;
  //   const BUCKET = process.env.AWS_BUCKET_NAME_PHOTO;
  //   const KEY = filename;
  //   try {
  //     const clientUrl = await this.createPresignedUrlWithClient({
  //       region: REGION,
  //       bucket: BUCKET,
  //       key: KEY,
  //     });
  //     console.log(clientUrl);
  //   } catch (err) {
  //     return err.message;
  //   }
  // }
}

//format:
//in S3 mannually generate:
//https://fotopie-photo.s3.ap-southeast-2.amazonaws.com/00dba63e-4219-4e1b-81d4-6cccf9df337d.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaDmFwLXNvdXRoZWFzdC0yIkYwRAIgXMIqJ%2Bc0tfvyjo5Jd6R7R64n17kumRpUOe1oqHTauA0CIB59vxSBuBKoOc9dy7XYjalwqlVk5qGYzGrOdS1KeVQhKuQCCCEQABoMMzMwNTUxNzgyMzg5IgyIE1Zj5r8BgbqFz2EqwQIx6s0bfMllykgQCt%2F85QE23oLlK5SwyLbmkO3HL%2BvVDxhfZcDzAYFcqFj0JEs%2FPnYB3dmEiuEwl44GNLBopXr3AL40SrjAKayp4Hdfzjsx0YTj3V6zA7HOvNMr0rSntOjKzM3oAcHXmTn5jByHRaimqF719XISAYDwR%2B0NofquP8ETTAd7DCtTTqRRDMw1PYYy3jwcTTeyXnCb1RgIIwznbyegworgss4RoYhbYWZWNISdnaL49qW6WGjXYq94OCQRNQhSsVv%2FetIoI89OMl0snv148t1U4jD79hMVeiblk1VRzT3YPtQdRhrIzPPuYil6dJ3IbxJD9xI31M9H6PGtu4lInYek8XUzvFjE8x4g0FDXx9jjHtpRZAyxsmQR5m9550zbnSjMW4rTAb0Q0CanLLutB6PPYu4YrIBq0birDo8w0MnOoAY6tAJu0QxdV8u56B%2BLMdP1K7rKKoW0%2Fk%2F7VXxxaBEB04fZqFbbrh1BSzZEKIWJ2Qgc0%2FK%2Fv2q6Ge9K5AknNOl%2Fm5cKjMDp2tjSlyIacKvcDb%2FQHoMR1whlhZRJi3YH34ckJ6YW7moONTFku%2BN2EUKW0jLnzJUnwPnyG6nAJnboOmc4vg4fJhAZ2h30bMrS3c69DXFb3WF7rYPEDVaEqOOUIeoVksgB89p%2FW5aWb9YBUQ%2FTV4asRYciND7KSgt2wsmO3%2Ff0oPJjFSKY4R2GSuTP2LGP8gTnf%2F0N99tqK7Uvxk01h4za2F8XGHfsSFF46P6LJBShxDj4XoowEUQSao%2B5LBAGxzesEWT5iEPdxgC5ooea0umZVcWRrURwrkgbQ%2Fb9xnNp4zQKDelq4BxHvnxnsxxVEUvgiw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230317T085856Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=ASIAUZ5TL5P2Y4U5BJUF%2F20230317%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=9ce03d94656fc73bda8307e01a7637a5e8630ad8883ee7e2429ff1a0d3a93b6c

//through nestjs-X-Amz-Security-Token missing, Sha256=unsigned:
//https://fotopie-photo.s3.ap-southeast-2.amazonaws.com/d53ae080-9030-4804-a50e-fd83d5275926.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUZ5TL5P2VFYL5R5Z%2F20230318%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230318T041858Z&X-Amz-Expires=900&X-Amz-Signature=b98365f4ad58fa90f490665d3fe740c23fb8c3f482639c5ea3f3bf7b3ef453e2&X-Amz-SignedHeaders=host

////////////////////////////////////////////////////////////////
//version 2
//base on official site in Chinese directions-->使用AWS软件开发工具包-->Javascript:
//https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html

// import {
//   CreateBucketCommand,
//   PutObjectCommand,
//   // GetObjectCommand,
//   DeleteObjectCommand,
//   DeleteBucketCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import fetch from "node-fetch";
// // import { S3Client } from "@aws-sdk/client-s3";

// @Injectable()
// export class DownloadService {
//   async generatePresignedUrl(filename: string) {
//     const s3Client = new S3Client({
//       region: process.env.BUCKET_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
//         // sessionToken: Hash.bind(null, "sha256"),
//       },
//       // sha256: Hash.bind(null, "sha256"),
//     });
//     const securityToken = Hash.bind(null, "sha256");
//     const bucketParams = {
//       Bucket: process.env.AWS_BUCKET_NAME_PHOTO,
//       Key: filename,
//       Body: "BODY",
//       SessionToken: securityToken,
//     };

//     // Create a presigned URL.
//     try {
//       const command = new GetObjectCommand(bucketParams);
//       const signedUrl = await getSignedUrl(s3Client, command, {
//         expiresIn: 900,
//       });
//       // console.log(signedUrl);
//       // const response = await fetch(signedUrl);
//       return signedUrl;
//     } catch (err) {
//       console.log("Error creating presigned URL", err);
//     }
//   }
// }

//format: through nestjs-X-Amz-Security-Token missing:
//https://fotopie-photo.s3.ap-southeast-2.amazonaws.com/d53ae080-9030-4804-a50e-fd83d5275926.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUZ5TL5P2VFYL5R5Z%2F20230318%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230318T045843Z&X-Amz-Expires=900&X-Amz-Signature=20facf9a195dd4dfe92c5e98b11ead7b7efea633715b7ff2412e94f950d50d3c&X-Amz-SignedHeaders=host&x-id=GetObject
