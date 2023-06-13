import { NextApiRequest, NextApiResponse } from 'next';
import { drive_v3, google } from 'googleapis';

const deleteDocuments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { urls } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive: drive_v3.Drive = google.drive({ version: 'v3', auth });

    await Promise.all(
      urls.map((url) =>
        drive.files.delete({
          fileId: url.split('/')[5],
        })
      )
    );

    res.status(200).json({ message: 'Documents deleted successfully' });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'Failed to delete documents' });
  }
};

export default deleteDocuments;
