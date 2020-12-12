export type TConfig = {
  apiName: string;
  appPort: string;
  env: string;
  debugMode: string;
  log: {
    level: string;
    filePath: string;
  };
};

type TProcessEnv = {
  API_ENV?: string;
  DEBUG_MODE?: string;
  SERVICE_NAME?: string;
  DEPLOY_ENV?: string;
  LOG_LEVEL?: string;
  LOG_PATH?: string;
  PORT?: string;
};

export declare var process: {
  env: TProcessEnv;
};
