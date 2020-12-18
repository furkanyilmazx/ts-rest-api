import HttpStatus, { StatusCodes } from 'http-status-codes';

import i18n from '@system/utils/i18n';
import { TLocaleId } from '@system/types/common';

class BaseError extends Error {
  name: string;
  errorMessage: string;
  errorCode: string;
  status: StatusCodes;

  constructor(msg: TLocaleId, ...rest: any[]) {
    const messageAnCode = i18n.__(msg, ...rest).split(';;');
    const code = messageAnCode[0];
    const message = messageAnCode[1];

    super(message);

    this.name = this.constructor.name;
    this.errorMessage = message;
    this.errorCode = code;
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default BaseError;
