import express from 'express';

import { routes } from '@application/routes';

import Logger from '@system/utils/logger';

const logger = Logger.child({ module: 'routes.ts' });

const router = express.Router();

routes.forEach(({ middlewares, path, controller, apiVersion, method }) => {
  if (!path.startsWith('/')) throw new Error(`API path must be start with '/' for ${path}`);
  const apiVersionPath = apiVersion ? `/api/${apiVersion}` : '';
  const fullPath = apiVersionPath.concat(path);

  logger.info(`${fullPath} ${method.toUpperCase()}`);
  router[method](fullPath, [...middlewares, controller]);
});

export default router;
