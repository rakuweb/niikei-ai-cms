import { google, drive_v3 } from 'googleapis';
import { parse } from 'url';
import { Readable } from 'stream';

export default async function uploadHandler(req: any, res: any) {
  const { method } = req;
  if (method === 'POST') {
    const drive: drive_v3.Drive = google.drive({
      version: 'v3',
      auth: new google.auth.GoogleAuth({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive'],
      }),
    });

    const bufferStream = new Readable();
    bufferStream.push(req.body.file, 'base64');
    bufferStream.push(null);

    const media = {
      mimeType: 'application/pdf',
      body: bufferStream,
    };

    try {
      const response = await drive.files.create({
        requestBody: {
          name: req.query.file,
          parents: ['1Y7wx5pBYOfliThVdr2wULSlYKYW_EWfX'],
        },
        media: media,
      });

      res
        .status(200)
        .json({
          message: 'File uploaded successfully',
          fileId: response.data.id,
        });
      console.log('File uploaded successfully:', response.data.id);
    } catch (err) {
      res.status(500).json({ message: 'Error uploading file', error: err });
      console.log('Error uploading file:', err);
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
    console.log('Method Not Allowed');
  }
}
