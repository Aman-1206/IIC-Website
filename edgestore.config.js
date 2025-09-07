import { createEdgeStoreProvider } from 'edgestore/server';

export const { createEdgeStoreRouter, handleUploadWebhook } = createEdgeStoreProvider({
  uploads: {
    pdfs: {
      maxSize: 10 * 1024 * 1024, // 10 MB
      accept: ['application/pdf'],
    },
  },
});
