import HttpStatus from 'http-status-codes';

import BaseError from '@system/common/BaseError';
import { TLocaleId } from '@system/types/common';

class RateLimiterError extends BaseError {
  constructor(msg: TLocaleId, ...rest: any[]) {
    super(msg, ...rest);
    this.name = this.constructor.name;
    this.status = HttpStatus.TOO_MANY_REQUESTS;
  }
}

export default RateLimiterError;
