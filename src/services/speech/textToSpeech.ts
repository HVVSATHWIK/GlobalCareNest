export const synthesizeSpeech = async (
  text: string,
  languageCode = 'en-US',
  voiceName = 'en-US-Neural2-A'
) => {
  console.warn(
    '[textToSpeech] Google Cloud Text-to-Speech SDK cannot run in the browser. ' +
      'Implement this via a backend endpoint (recommended) or swap to a browser TTS API.'
  );

  void text;
  void languageCode;
  void voiceName;

  throw new Error('Text-to-speech is not available in the client build.');
};