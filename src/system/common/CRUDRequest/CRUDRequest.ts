import express from 'express';

class CRUDRequest {
  readonly page: number = 0;
  readonly size: number = 10;
  readonly limit: number;
  readonly offset: number;
  readonly sort?: { [key: string]: string };
  readonly search?: { [key: string]: string };

  constructor(req: express.Request, sortableFields?: string[], searchableFields?: string[]) {
    this.page = parseInt((req.query.page as string) || '0');
    this.size = parseInt((req.query.size as string) || '10');
    this.limit = this.size;
    this.offset = this.page * this.size;

    const qsSort = req.query?.sort;
    const sortFields = (Array.isArray(qsSort) ? qsSort : [qsSort]) as string[];
    this.sort = sortFields.reduce((acc, cur) => {
      const [key, value] = cur?.split(':');

      return sortableFields?.includes(key) && (value === 'asc' || value === 'desc')
        ? { ...acc, [key]: value === 'asc' ? 1 : -1 }
        : acc;
    }, {});

    const qsSearch = req.query?.search;
    const searchFields = (Array.isArray(qsSearch) ? qsSearch : [qsSearch]) as string[];
    this.search = searchFields.reduce((acc, cur) => {
      const [key, value] = cur?.split(':');
      return searchableFields?.includes(key) ? { ...acc, [key]: value } : acc;
    }, {});
  }
}

export default CRUDRequest;
