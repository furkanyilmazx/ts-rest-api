import express from 'express';

function notFoundMiddleware(
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line no-unused-vars
  _next: express.NextFunction
) {
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
}

export default notFoundMiddleware;
