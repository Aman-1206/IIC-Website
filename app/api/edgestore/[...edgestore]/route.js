import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { edgeStoreRouter } from '../../../../edgestore.config';

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export const GET = handler;
export const POST = handler;