import express from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import RateLimiterError from '@system/errors/RateLimiterError';

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

async function rateLimiterMiddleware(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  try {
    await rateLimiter.consume(req.ip);
  } catch (error) {
    throw new RateLimiterError('errors.tooManyRequest');
  }
  next();
}

export default rateLimiterMiddleware;
