import express from 'express';

import i18n from '@system/utils/i18n';

import localeMiddleware from './localeMiddleware';

describe('localeMiddleware.test', () => {
  const spySetLocale = jest.spyOn(i18n, 'setLocale');

  const req = {
    body: {},
    query: {},
    headers: {},
  } as express.Request;
  const res = ({ setHeader: jest.fn() } as unknown) as express.Response;
  const next = jest.fn();
  const spySetHeader = jest.spyOn(res, 'setHeader');

  afterEach(() => {
    expect(spySetHeader).toBeCalledTimes(1);
    expect(spySetLocale).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);

    spySetLocale.mockClear();
    next.mockClear();
    spySetHeader.mockClear();
  });

  it('when empty locale it should be en (default)', () => {
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('en');
  });

  it('when header is tr it should be tr', () => {
    req.headers['x-locale'] = 'tr';
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('tr');
  });

  it('when query locale is gb it should be en (default)', () => {
    req.query.locale = 'gb';
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('en');
  });

  it('when query locale is tr it should be tr', () => {
    req.query.locale = 'tr';
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('tr');
  });

  it('when body locale is tr it should be tr', () => {
    req.body.locale = 'tr';
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('tr');
  });

  it('when body locale is en it should be en (default)', () => {
    req.body.locale = 'en';
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('en');
  });

  it('when body locale is tr it should be tr', () => {
    req.body.locale = 'tr';
    localeMiddleware(req, res, next);
    expect(i18n.getLocale()).toBe('tr');
  });
});
