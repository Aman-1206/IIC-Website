// edgestore.config.js
import { initEdgeStore } from '@edgestore/server';

const es = initEdgeStore.create();

export const edgeStoreRouter = es.router({
  pdfs: es.fileBucket({
    maxSize: 10 * 1024 * 1024, // 10 MB
    accept: ['application/pdf'],
  }),
  publicFiles: es.fileBucket({
    maxSize: 5 * 1024 * 1024, // 5 MB
    accept: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  }),
});

export const { handleUploadWebhook } = es;
