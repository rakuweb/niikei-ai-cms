import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucketName = 'test-niikei';

export default async (req, res) => {
  const filename = req.body.filename;
  const mp3Data = req.body.data;

  // 一時的にファイルをサーバー上に保存
  const tempFilePath = `/tmp/${filename}`;
  require('fs').writeFileSync(tempFilePath, Buffer.from(mp3Data));

  // Google Cloud Storageにファイルをアップロード
  await storage.bucket(bucketName).upload(tempFilePath, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  res.status(200).send(`gs://${bucketName}/${filename}`);
};
