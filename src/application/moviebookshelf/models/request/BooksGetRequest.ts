import express from 'express';

import CRUDRequest from '@system/common/CRUDRequest';

class BooksGetRequest {
  crud: CRUDRequest;

  constructor(req: express.Request) {
    this.crud = new CRUDRequest(req, ['author', 'isbn'], ['author', 'isbn']);
  }
}

export default BooksGetRequest;
