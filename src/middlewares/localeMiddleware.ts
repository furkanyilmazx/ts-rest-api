import express from 'express';

import i18n from '@project/utils/i18n';

import { TLocale } from '@project/locales';

function localeMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const locale: TLocale = req.body?.locale || req.query.locale || 'en';
  res.setHeader('X-Locale', locale);
  i18n.setLocale(locale);
  next();
}

export default localeMiddleware;
