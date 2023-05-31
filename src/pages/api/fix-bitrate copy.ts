import { Storage } from '@google-cloud/storage';
import ffmpeg from 'fluent-ffmpeg';

export default async function handler(req: any, res: any) {
  const { method } = req;
  if (method === 'GET') {
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

    const outputFileName = `${req.query.file}-fixed.wav`;
    const outputFile = bucket.file(outputFileName);
    const writeStream = outputFile.createWriteStream();

    ffmpeg(file.createReadStream())
      .outputFormat('wav')
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .audioFrequency(16000)
      .pipe(writeStream, { end: true });

    writeStream
      .on('finish', () => {
        res
          .status(200)
          .json({ message: 'File has been converted to LINEAR16 and saved.' });
      })
      .on('error', (err) => {
        console.log('An error occurred: ', err.message);
        res.status(500).json({ message: 'error' });
      });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
