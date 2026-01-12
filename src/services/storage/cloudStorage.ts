import { getDownloadURL, ref, uploadBytes, type UploadMetadata } from 'firebase/storage';
import { storage } from '../../config/firebase';

type UploadFileMetadata = Record<string, string>;

export const uploadFile = async (
  file: Blob | Uint8Array | ArrayBuffer,
  destination: string,
  metadata: UploadFileMetadata = {}
): Promise<string> => {
  try {
    const storageRef = ref(storage, destination);

    const { contentType, ...customMetadata } = metadata;
    const uploadMetadata: UploadMetadata = {};
    if (contentType) uploadMetadata.contentType = contentType;
    if (Object.keys(customMetadata).length > 0) {
      uploadMetadata.customMetadata = customMetadata;
    }

    await uploadBytes(storageRef, file, uploadMetadata);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    throw error;
  }
};