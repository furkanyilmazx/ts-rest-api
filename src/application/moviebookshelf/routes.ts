import { TEndpoint } from '@system/types/routes';

import booksController from './controllers/booksController';

export const moviebookShelfRoutes: TEndpoint = [
  {
    apiVersion: 'v1',
    path: '/books',
    middlewares: [],
    controller: booksController,
    method: 'get',
  },
  {
    apiVersion: 'v1',
    path: '/books/get',
    middlewares: [],
    controller: booksController,
    method: 'post',
  },
];
