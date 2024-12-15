import { VertexAI } from '@google-cloud/vertexai';
import { gcpConfig } from '../../config/gcp.config';

const vertexai = new VertexAI({
  project: gcpConfig.projectId,
  location: gcpConfig.region,
  credentials: gcpConfig.credentials
});

export const getMedicalAnalysis = async (prompt: string) => {
  try {
    const model = vertexai.preview.getGenerativeModel({
      model: 'medlm',
      generation_config: {
        max_output_tokens: 2048,
        temperature: 0.4,
        top_p: 0.8,
        top_k: 40,
      },
    });

    const result = await model.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error in medical analysis:', error);
    throw error;
  }
};