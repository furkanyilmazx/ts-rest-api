export type TConfig = {
  API_NAME: string;
  API_PORT: string;
  API_ENV: TApiEnv;
  DEPLOY_ENV: TDeployEnv;
  DEBUG_MODE: string;
  LOG: {
    LEVEL: string;
    FILE_PATH: string;
  };
};

export type TApiEnv = 'local' | 'stg' | 'sandbox' | 'production';
export type TDeployEnv = 'dc' | 'dr';

type TProcessEnv = {
  API_ENV?: string;
  DEPLOY_ENV: string;
  DEBUG_MODE?: string;
  SERVICE_NAME?: string;
  LOG_LEVEL?: string;
  LOG_PATH?: string;
  PORT?: string;
};

export declare var process: {
  env: TProcessEnv;
};
