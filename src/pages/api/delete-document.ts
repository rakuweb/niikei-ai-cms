import { NextApiRequest, NextApiResponse } from 'next';
import { docs_v1, drive_v3, google } from 'googleapis';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

export const maxDuration = 300;

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const deleteDocuments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { documentId } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive: drive_v3.Drive = google.drive({ version: 'v3', auth });
    // Fetch all documents in the specific folder
    const list = await drive.files.list({
      q: `'1MTtd2Kd3J7vyS3RraDtqQh1vMJLslWkO' in parents`,
    });

    // Find the document with the same documentId
    const file = list.data.files?.find((file) => file.id === documentId);
    if (!file) {
      throw new Error('ドキュメントが見つかりません');
    }

    const text = '';
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
    await drive.files.update({
      fileId: documentId,
      requestBody: {
        name: '',
      },
    });

    // await Promise.all(
    //   urls.map((url) =>
    //     drive.files.delete({
    //       fileId: url.split('/')[5],
    //     })
    //   )
    // );

    res.status(200).json({ message: 'Documents deleted successfully' });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'Failed to delete documents' });
  }
};

export default deleteDocuments;
