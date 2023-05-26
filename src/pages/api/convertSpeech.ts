import { SpeechClient, protos } from '@google-cloud/speech';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

type IRecognitionConfig = protos.google.cloud.speech.v1.IRecognitionConfig;

export default async (req, res) => {
  const mp3Data = req.body;

  const name = 'input.mp3';

  await ffmpeg.load(); // ffmpegがロードされるまで待つ
  ffmpeg.FS('writeFile', name, await fetchFile(mp3Data));

  await ffmpeg.run('-i', name, 'output.flac');

  const flacData = ffmpeg.FS('readFile', 'output.flac');
  const audio = {
    content: new Uint8Array(flacData.buffer), // Uint8Arrayに変換
  };

  const config: IRecognitionConfig = {
    encoding: 'FLAC',
    sampleRateHertz: 8000,
    languageCode: 'ja-JP',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const client = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  const response = await client.recognize(request);
  const transcript = response[0].results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  res.status(200).json({ transcript });
};
