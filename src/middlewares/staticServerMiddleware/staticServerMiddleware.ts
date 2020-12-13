import express from 'express';
import path from 'path';

import CONFIG from '@project/configs';

const staticFilesDir = path.join(__dirname, CONFIG.PUBLIC_DIR);
const indexHtmlDir = staticFilesDir + '/index.html';

function indexHtmlServeMiddleware(
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  if (req.accepts('html')) {
    res.sendFile(indexHtmlDir);
    return;
  }
  _next();
}
const staticServerMiddleware = [express.static(staticFilesDir), indexHtmlServeMiddleware];

export default staticServerMiddleware;
