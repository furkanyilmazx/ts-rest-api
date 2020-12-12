import express from 'express';
import { StatusCodes } from 'http-status-codes';

import Response from './common/Response';

import Logger, { loggerMiddleware } from '@project/utils/logger';
import { TCorrelationIdRequest } from '@project/types/common';

const logger = Logger.child({ module: 'index.ts' });

const PORT = process.env.PORT || 8080;

const app = express();
app.use(loggerMiddleware);

app.get('/health', (req: TCorrelationIdRequest, res) => {
  logger.info(`dsad ${req.correlationId}`);
  new Response<object>({
    status: StatusCodes.OK,
    result: '',
    pagination: { total: '21', page: '1', pageSize: '3' },
  }).send(res);
});

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Ssssddezrver is running at http://localhost:${PORT}`);
});
