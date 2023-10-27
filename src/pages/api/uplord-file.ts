import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'POST') {
    const storage = new Storage({
      credentials: credentials,
    });
    const bucketName = 'niikei3';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(req.query.file as string);
    const options = {
      expires: Date.now() + 1 * 60 * 1000,
      fields: { 'x-goog-meta-test': 'data' },
    };
    const [response] = await file.generateSignedPostPolicyV4(options);
    console.log(response);
    res.status(200).json(response);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
