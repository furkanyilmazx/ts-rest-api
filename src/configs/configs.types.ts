export type TConfig = {
  API_NAME: string;
  API_PORT: string;
  API_ENV: TApiEnv;
  DEPLOY_ENV: TDeployEnv;
  PUBLIC_DIR: string;
  DEBUG_MODE: string;
  LOG: {
    LEVEL: string;
    FILE_PATH: string;
  };
};

export type TApiEnv = 'local' | 'stg' | 'sandbox' | 'production';
export type TDeployEnv = 'dc' | 'dr';
