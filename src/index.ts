import express from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

import CONFIG from '@project/configs';
import Response from '@project/common/Response';
import { TCorrelationIdRequest } from '@project/types/common';

import Logger from '@project/utils/logger';
import middlewares from '@project/middlewares/middlewares';

const { beforeMiddlewares, afterMiddlewares } = middlewares;

const logger = Logger.child({ module: 'index.ts' });

const app = express();
// Middleware before all routes
app.disable('x-powered-by');
app.use(beforeMiddlewares);

// All routes must be in below
app.get('/health', (req: TCorrelationIdRequest, res, next) => {
  logger.info('Health', { correlationId: req.correlationId });
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
