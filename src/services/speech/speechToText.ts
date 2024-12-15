import { SpeechClient } from '@google-cloud/speech';

const speechClient = new SpeechClient();

export const transcribeAudio = async (audioBuffer: Buffer, languageCode = 'en-US') => {
  try {
    const audio = {
      content: audioBuffer.toString('base64'),
    };
    
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: languageCode,
      model: 'medical_conversation',
      useEnhanced: true,
    };

    const request = {
      audio: audio,
      config: config,
    };

    const [response] = await speechClient.recognize(request);
    return response.results
      ?.map(result => result.alternatives?.[0]?.transcript)
      .join('\n');
  } catch (error) {
    console.error('Error in speech-to-text:', error);
    throw error;
  }
};