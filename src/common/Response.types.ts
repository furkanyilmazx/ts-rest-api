import express from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseError from './BaseError';

type TResponse = {
  pagination?: {
    page: string;
    pageSize: string;
    total: string;
  };
  status: StatusCodes;
  result: TResult;
  res?: express.Response;
};

type ErroredResponse = BaseError & Partial<TResponse>;
type SuccessedResponse = TResponse & Partial<BaseError>;

export type TResponseProps<T> = T extends BaseError ? ErroredResponse : SuccessedResponse;

export type TResult = string | object | null | undefined;
