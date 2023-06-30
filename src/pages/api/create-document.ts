import { NextApiRequest, NextApiResponse } from 'next';
import { docs_v1, drive_v3, google } from 'googleapis';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const createDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, text } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      // WARN:
      // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/documents',
      ],
    });

    const drive: drive_v3.Drive = google.drive({ version: 'v3', auth });
    const documentMetadata = {
      name: title,
      mimeType: 'application/vnd.google-apps.document',
      parents: ['1MTtd2Kd3J7vyS3RraDtqQh1vMJLslWkO'],
    };
    const createdDocument = await drive.files.create({
      requestBody: documentMetadata,
    });

    const { id: documentId } = createdDocument.data;

    const document = await drive.files.get({
      fileId: documentId,
      fields: 'webViewLink',
    });

    const url = document.data.webViewLink;

    const docs: docs_v1.Docs = google.docs({ version: 'v1', auth });
    const requests = text
      ? [
        {
          insertText: {
            location: {
              index: 1,
            },
            text,
          },
        },
      ]
      : [];

    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests,
        },
      });
    }

    res.status(200).json({ documentId, url });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Failed to create document' });
  }
};

export default createDocument;
