import HttpStatus, { StatusCodes } from 'http-status-codes';

import i18n from '@project/utils/i18n';
import { TLocaleId } from '@project/types/common';

class BaseError extends Error {
  name: string;
  code: string;
  status: StatusCodes;

  constructor(msg: TLocaleId, ...rest: any[]) {
    const messageAnCode = i18n.__(msg, ...rest).split(';;');
    console.log('constructor ~ i18n.__(msg, ...rest)', i18n.__(msg), msg);
    const code = messageAnCode[0];
    const message = messageAnCode[1];

    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default BaseError;
