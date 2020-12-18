import express from 'express';

import { TLocale } from '@locales';

import i18n from '@system/utils/i18n';

function localeMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const locale: TLocale =
    req.body?.locale || req.query.locale || req.headers['x-locale'] || 'en';
  res.setHeader('X-Locale', locale);
  i18n.setLocale(locale);
  next();
}

export default localeMiddleware;
