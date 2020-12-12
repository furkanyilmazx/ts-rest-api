import express from 'express';
import { StatusCodes } from 'http-status-codes';

import Response from './common/Response';

import localeMiddleware from '@project/middlewares/localeMiddleware';
import Logger, { loggerMiddleware } from '@project/utils/logger';
import { TCorrelationIdRequest } from '@project/types/common';
import BaseError from './common/BaseError';

const logger = Logger.child({ module: 'index.ts' });

const PORT = process.env.PORT || 8080;

const app = express();
app.use(loggerMiddleware);
app.use(localeMiddleware);

app.get('/health', (req: TCorrelationIdRequest, res) => {
  logger.info(`dsad ${req.correlationId}`);
  new Response<BaseError>(new BaseError('errors.general')).send(res);
});

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Ssssddezrver is running at http://localhost:${PORT}`);
});
