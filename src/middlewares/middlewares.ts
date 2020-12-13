import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { loggerMiddleware } from '@project/utils/logger';

import localeMiddleware from './localeMiddleware';
import staticServerMiddleware from './staticServerMiddleware';
import notFoundMiddleware from './notFoundMiddleware';
import errorMiddleware from './errorMiddleware';

const beforeMiddlewares: express.RequestHandler[] = [
  ...loggerMiddleware,
  cors<express.Request>(),
  express.json(),
  express.urlencoded({ extended: true }),
  localeMiddleware,
  compression(),
];

const afterMiddlewares = [...staticServerMiddleware, notFoundMiddleware, errorMiddleware];

export default { beforeMiddlewares, afterMiddlewares };
