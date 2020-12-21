import express from 'express';

type THttpMethod =
  | 'connect'
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put'
  | 'trace';

export type TRoute = {
  apiVersion?: 'v1' | 'v2';
  path: string;
  middlewares: express.RequestHandler[];
  controller: express.RequestHandler;
  method: THttpMethod;
};

export type TEndpoint = TRoute[];
