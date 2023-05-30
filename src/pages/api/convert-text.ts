import speech from '@google-cloud/speech';

export default async function handler(req: any, res: any) {
  if (req.query.file && req.method === 'POST') {
    const bucketName = 'niikei2';
    const client = new speech.SpeechClient();
    const gcsUri = `gs://niikei2/mp3text`;
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

    const response = await client.recognize(request);
    console.log(response);
    const transcription = response[0].results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');

    res.status(200).json({ text: transcription });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
