import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = process.env.VITE_GCP_STORAGE_BUCKET;

export const uploadFile = async (
  file: Buffer,
  destination: string,
  metadata: Record<string, string> = {}
) => {
  try {
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(destination);
    
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: metadata.contentType,
        ...metadata,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => reject(error));
      blobStream.on('finish', () => {
        resolve(`gs://${bucketName}/${destination}`);
      });
      blobStream.end(file);
    });
  } catch (error) {
    console.error('Error uploading to Cloud Storage:', error);
    throw error;
  }
};