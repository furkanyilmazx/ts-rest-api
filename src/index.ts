import express from 'express';
import 'express-async-errors';

import Response from '@system/common/Response';
import CONFIG from '@system/configs';
import Logger from '@system/utils/logger';
import middlewares from '@system/middlewares/middlewares';
import router from '@system/utils/router';

import '@system/utils/mongoose';

const { beforeMiddlewares, afterMiddlewares } = middlewares;

const logger = Logger.child({ module: 'index.ts' });

const app = express();
// Middleware before all routes
app.disable('x-powered-by');
app.use(beforeMiddlewares);

// Applications router
app.use(router);

// All routes must be in below
app.get('/health', (req, res) => {
  logger.info('Health');
  const response = new Response<object>({
    result: { Anaaa: 'SSS' },
  });

  response.send(res);
});

app.use(afterMiddlewares);

app.listen(CONFIG.API_PORT, () => {
  logger.info(`⚡️[server]: Ssssddezrver is srunning at http://localhost:${CONFIG.API_PORT}`);
});
