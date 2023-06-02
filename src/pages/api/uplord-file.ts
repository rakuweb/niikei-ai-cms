import { Storage } from '@google-cloud/storage';

export default async function uploadHandler(req: any, res: any) {
  const { method } = req;
  if (method === 'POST') {
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
    res.status(200).json(response);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
