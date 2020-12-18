import express from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

import Response from '@system/common/Response';
import CONFIG from '@system/configs';
import Logger from '@system/utils/logger';
import middlewares from '@system/middlewares/middlewares';
import { TCorrelationIdRequest } from '@system/types/common';

const { beforeMiddlewares, afterMiddlewares } = middlewares;

const logger = Logger.child({ module: 'index.ts' });

const app = express();
// Middleware before all routes
app.disable('x-powered-by');
app.use(beforeMiddlewares);

// All routes must be in below
app.get('/health', (req: TCorrelationIdRequest, res, next) => {
  logger.info('Health');
  try {
    const response = new Response<object>({
      result: { Anaaa: 'SSS' },
      status: StatusCodes.PARTIAL_CONTENT,
    });
    response.send(res);
  } catch (error) {
    next(error);
  }
});

app.use(afterMiddlewares);

app.listen(CONFIG.API_PORT, () => {
  logger.info(`⚡️[server]: Ssssddezrver is srunning at http://localhost:${CONFIG.API_PORT}`);
});
