import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { TResponseProps, TResult } from './Response.types';

export default class Response<T> {
  readonly page?: string;
  readonly page_size?: string;
  readonly total?: string;
  readonly status: 'success' | 'failure';
  readonly result: TResult;
  readonly error_code?: string;
  readonly error_message?: string;
  readonly system_time: number;
  private _correlation_id?: string;
  private readonly _res?: express.Response;
  private _httpStatus: StatusCodes;

  constructor({
    pagination,
    status,
    res,
    result,
    errorCode,
    errorMessage,
    correlation_id,
  }: TResponseProps<T>) {
    this._httpStatus = status || StatusCodes.OK;
    this.system_time = Date.now();
    this.page = pagination?.page;
    this.page_size = pagination?.pageSize;
    this.total = pagination?.total;
    this.result = result;
    this._res = res;
    this.status = errorCode ? 'failure' : 'success';
    this.error_code = errorCode;
    this.error_message = errorMessage;
    this._correlation_id = correlation_id;

    this.makeNotEnumarable('_correlation_id');
    this.makeNotEnumarable('_httpStatus');
  }

  makeNotEnumarable(property: string): void {
    Object.defineProperty(this, property, {
      configurable: false,
      writable: false,
      enumerable: false,
    });
  }

  send(res: express.Response) {
    let response = res || this._res;
    this._correlation_id && response.setHeader('X-Correlation', this._correlation_id);
    response.status(this._httpStatus).send(this);
  }
}
