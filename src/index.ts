import express from 'express';

import localeMiddleware from '@project/middlewares/localeMiddleware';
import errorMiddleware from '@project/middlewares/errorMiddleware';
import Logger, { loggerMiddleware } from '@project/utils/logger';
import { TCorrelationIdRequest } from '@project/types/common';
import BaseError from './common/BaseError';

const logger = Logger.child({ module: 'index.ts' });

const PORT = process.env.PORT || 8080;

const app = express();

app.use(loggerMiddleware);
app.use(localeMiddleware);

app.get('/health', (req: TCorrelationIdRequest, res, next) => {
  logger.info('Health', { correlationId: req.correlationId });
  try {
    throw new BaseError('errors.generalWithCause', 'Deneme');
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Ssssddezrver is running at http://localhost:${PORT}`);
});
