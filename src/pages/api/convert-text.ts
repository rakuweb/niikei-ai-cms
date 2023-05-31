import * as speech from '@google-cloud/speech';

export default async function handler(req: any, res: any) {
  if (req.query.file && req.method === 'POST') {
    const bucketName = 'niikei2';
    const fileName = 'mp3text';
    const client = new speech.SpeechClient();
    const gcsUri = `gs://${bucketName}/mp3text`;
    const audio = {
      uri: gcsUri,
    };
    const config = {
      encoding: 'MP3',
      sampleRateHertz: 16000,
      languageCode: 'ja-JP',
      enableAutomaticPunctuation: true,
    };
    const request = {
      audio: audio,
      config: config,
    };

    const operation = await client.longRunningRecognize(request);
    const [response] = await operation[0].promise();

    if (response.results) {
      const transcription = response.results
        .map((result: any) => result.alternatives[0].transcript)
        .join('\n');
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
