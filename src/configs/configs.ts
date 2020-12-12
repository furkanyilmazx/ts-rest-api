import dotenv from 'dotenv';

import { TApiEnv, TConfig, TDeployEnv } from './configs.types';

dotenv.config();

type TProcessEnv = {
  API_ENV?: 'local' | 'stg' | 'sandbox' | 'production';
  DEPLOY_ENV: 'dc' | 'dr';
  DEBUG_MODE?: string;
  SERVICE_NAME?: string;
  LOG_LEVEL?: string;
  LOG_PATH?: string;
  PORT?: string;
};

declare var process: {
  env: TProcessEnv;
};

const CONFIG: TConfig = {
  API_NAME: process.env.SERVICE_NAME || 'rest-api',
  API_PORT: process.env.PORT || '8080',
  API_ENV: (process.env.API_ENV as TApiEnv) || 'production',
  DEPLOY_ENV: (process.env.DEPLOY_ENV as TDeployEnv) || 'dc',
  DEBUG_MODE: process.env.DEBUG_MODE || 'disabled',
  LOG: {
    LEVEL: process.env.LOG_LEVEL || 'info',
    FILE_PATH: process.env.LOG_PATH || './logs',
  },
};

export default CONFIG;
