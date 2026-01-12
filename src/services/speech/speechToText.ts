export const transcribeAudio = async (_audio: ArrayBuffer | Blob, languageCode = 'en-US') => {
  console.warn(
    '[speechToText] Google Cloud Speech SDK cannot run in the browser. ' +
      'Implement transcription via a backend endpoint (recommended) or use a browser speech recognition API.'
  );

  void languageCode;
  throw new Error('Speech-to-text is not available in the client build.');
};