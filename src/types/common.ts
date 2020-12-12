import express from 'express';

import { en, tr } from '@project/locales';

export type TLocaleId = keyof typeof en | keyof typeof tr;

export type TCorrelationIdRequest = {
  correlationId?: string;
} & express.Request;
