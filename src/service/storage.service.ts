import { BlobServiceClient } from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import { buffer } from 'stream/consumers';
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING ?? '';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

export const uploadImage = async (file: File) => {
    const containerClient = blobServiceClient.getContainerClient('dubbingapp');
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadData(file);
    return blockBlobClient.url;
}
export const uploadArrayBuffer = async (file: File, name: string) => {
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(arrayBuffer);

    // Get container client
    const containerClient = blobServiceClient.getContainerClient('dubbingapp');
    const blockBlobClient = containerClient.getBlockBlobClient(name);

    // Upload buffer to Azure Blob Storage
    const uploadResponse = await blockBlobClient.uploadData(buffer);

    return uploadResponse;
  } catch (err) {
    console.error('Error uploading to Azure Blob Storage:', err);
    throw err;
  }
};
