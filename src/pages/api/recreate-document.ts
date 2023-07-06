import { NextApiRequest, NextApiResponse } from 'next';
import { docs_v1, drive_v3, google } from 'googleapis';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const recreateDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, text, doc_id } = req.body;

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
    const documentId = doc_id;
    const newTitle = title;
    const newContent = text;

    // documentにtitle, textを挿入
    const docs = google.docs({ version: 'v1', auth });
    const respose = await docs.documents.get({ documentId: documentId });
    const target = respose.data;
    target.title = newTitle;
    target.body.content = [
      {
        paragraph: {
          elements: [
            {
              textRun: {
                content: newContent,
              },
            },
          ],
        },
      },
    ];
    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: [
          {
            updateDocumentStyle: {
              documentStyle: {
                title: {
                  title: newTitle,
                },
              },
              fields: 'title',
            },
          },
          {
            updateParagraphStyle: {
              range: {
                startIndex: 1,
                endIndex:
                  target.body.content[0].paragraph.elements[0].textRun.content
                    .length + 1,
              },
              paragraphStyle: {
                alignment: 'START',
              },
              fields: 'alignment',
            },
          },
          {
            deleteParagraphBullets: {
              range: {
                startIndex: 1,
                endIndex:
                  target.body.content[0].paragraph.elements[0].textRun.content
                    .length + 1,
              },
            },
          },
        ],
      },
    });

    res.status(200).json({ documentId, url });
  } catch (error) {
    console.error('Error recreating document:', error);
    res.status(500).json({ error: 'Failed to recreate document' });
  }
};

export default recreateDocument;
