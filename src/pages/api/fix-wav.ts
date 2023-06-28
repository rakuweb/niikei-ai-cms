import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

export default async function convertHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'GET') {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
    const bucketName = 'niikei2';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(req.query.file as string);
    const outputFileName = `${req.query.file}-fixed.wav`;

    ffmpeg(file.createReadStream())
      .audioBitrate(128)
      .audioFrequency(44100)
      .audioChannels(1)
      .format('wav')
      .save(outputFileName)
      .on('end', async () => {
        const localReadStream = fs.createReadStream(outputFileName);
        const remoteWriteStream = bucket
          .file(outputFileName)
          .createWriteStream();
        localReadStream
          .pipe(remoteWriteStream)
          .on('error', (err) => {
            console.log('アップロード中にエラーが発生しました: ', err.message);
            res.status(500).json({ message: 'error' });
          })
          .on('finish', () => {
            fs.unlink(outputFileName, (err) => {
              if (err)
                console.error(
                  'ローカルファイルの削除中にエラーが発生しました: ',
                  err.message
                );
            });
            res.status(200).json({ message: 'Converted successfully!' });
          });
      })
      .on('error', (err) => {
        console.log('変換中にエラーが発生しました: ', err.message);
        res.status(500).json({ message: 'error' });
      });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
