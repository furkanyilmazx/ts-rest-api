import express from 'express';

import Response from '@system/common/Response';

import Logger from '@system/utils/logger';
import Book from '../models/entity/Book';
import BooksGetRequest from '../models/request/BooksGetRequest';

const logger = Logger.child({ module: 'booksController.js' });

async function booksController(req: express.Request, res: express.Response) {
  logger.info('GIRDIMMM');

  const a = new BooksGetRequest(req);

  const book = await Book.create({
    isbn: Math.random().toString(),
    author: 'ss',
    avarageRating: 12,
    name: 'ss',
  });

  const ttt = await Book.find({
    name: 'ss',
    ...a.crud.search,
  })
    .sort(a.crud.sort)
    .skip(a.crud.offset)
    .limit(a.crud.limit);

  console.log(a);

  return new Response({
    result: ttt,
  }).send(res);
}

export default booksController;
