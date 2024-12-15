import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient();

export const synthesizeSpeech = async (
  text: string,
  languageCode = 'en-US',
  voiceName = 'en-US-Neural2-A'
) => {
  try {
    const request = {
      input: { text },
      voice: { languageCode, name: voiceName },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent;
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    throw error;
  }
};