import { google, drive_v3 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

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

  if (method === 'POST') {
    const fileId = req.body.fileId;

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive: drive_v3.Drive = google.drive({ version: 'v3', auth });

    try {
      if (typeof req.query.file !== 'string') {
        throw new Error('Expected a single file name');
      }

      const response = await drive.files.copy({
        fileId: fileId,
        requestBody: {
          name: req.query.file,
          parents: ['1Y7wx5pBYOfliThVdr2wULSlYKYW_EWfX'],
          mimeType: 'application/vnd.google-apps.document',
        },
      });

      const docId = response.data.id;

      const doc = await drive.files.export({
        fileId: docId,
        mimeType: 'text/plain',
      });

      const text = doc.data;

      res.status(200).json({ text: text });
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.error(err);
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
