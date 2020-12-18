import express from 'express';

import { en } from '@locales';

export type TLocaleId = keyof typeof en;

export type TCorrelationIdRequest = {
  correlationId?: string;
} & express.Request;
