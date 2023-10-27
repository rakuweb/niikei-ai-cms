import { NextApiRequest, NextApiResponse } from 'next';
import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

export const maxDuration = 300;

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'POST') {
    const base64String = await req.body;

    const data = Buffer.from(base64String, 'base64');

    const drive: drive_v3.Drive = google.drive({
      version: 'v3',
      auth: new google.auth.GoogleAuth({
        credentials: credentials,
        // WARN:
        // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive'],
      }),
    });

    const bufferStream = new Readable();
    bufferStream.push(data);
    bufferStream.push(null);

    const media = {
      mimeType: 'application/pdf',
      body: bufferStream,
    };

    try {
      const response = await drive.files.create({
        requestBody: {
          name: req.query.file as string,
          parents: ['1Y7wx5pBYOfliThVdr2wULSlYKYW_EWfX'],
        },
        media: media,
      });

      res.status(200).json({
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};
