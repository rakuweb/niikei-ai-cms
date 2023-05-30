import { Storage } from '@google-cloud/storage';

export default async function handler(req: any, res: any) {
  if (req.query.file && req.method === 'GET') {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
    const bucketName = 'niikei2';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(req.query.file);
    const options = {
      expires: Date.now() + 1 * 60 * 1000,
      fields: { 'x-goog-meta-test': 'data' },
    };
    const [response] = await file.generateSignedPostPolicyV4(options);
    console.log(response);
    res.status(200).json(response);
  } else {
    res.status(400).send('Invalid request');
  }
}
