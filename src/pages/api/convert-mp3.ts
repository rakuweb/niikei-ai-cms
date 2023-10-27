import { NextApiRequest, NextApiResponse } from 'next';
import * as speech from '@google-cloud/speech';
import { Storage } from '@google-cloud/storage';
import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

export const maxDuration = 300;

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.file && req.method === 'POST') {
    const bucketName = 'niikei3';
    const fileName = 'mp3text';
    const client = new speech.SpeechClient({ credentials: credentials });

    const gcsUri = `gs://${bucketName}/${fileName}`;
    const audio = {
      uri: gcsUri,
    };
    const config: speech.protos.google.cloud.speech.v1.IRecognitionConfig = {
      encoding: 'LINEAR16',
      languageCode: 'ja-JP',
      enableAutomaticPunctuation: true,
    };

    const request: speech.protos.google.cloud.speech.v1.ILongRunningRecognizeRequest =
    {
      audio: audio,
      config: config,
    };

    const operation = await client.longRunningRecognize(request);
    const [response] = await operation[0].promise();

    if (response.results) {
      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');

      const storage = new Storage({ credentials: credentials });
      const bucket = storage.bucket(bucketName);

      const file = bucket.file(fileName);
      await file.delete();

      res.status(200).json({ text: transcription });
    } else {
      res.status(500).json({
        error: 'Speech-to-Text operation completed but no result was returned',
      });
    }
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
