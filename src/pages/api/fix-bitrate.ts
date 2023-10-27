import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import ffmpeg from 'fluent-ffmpeg';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

export const maxDuration = 300;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'GET') {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: credentials,
      // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
    const bucketName = 'niikei2';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(req.query.file as string);
    const options = {
      expires: Date.now() + 1 * 60 * 1000,
      fields: { 'x-goog-meta-test': 'data' },
    };
    const [response] = await file.generateSignedPostPolicyV4(options);
    console.log(response);
    ffmpeg(file.createReadStream())
      .audioBitrate(128)
      .save(`${req.query.file}-fixed.mp3`)
      .on('end', () => {
        res.status(200).json(response);
      })
      .on('error', (err) => {
        console.log('An error occurred: ', err.message);
        res.status(500).json({ message: 'error' });
      });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
