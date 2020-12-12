import dotenv from 'dotenv';
import { TConfig, process } from './configs.types';

dotenv.config();

const {
  API_ENV = 'local',
  DEBUG_MODE = 'disabled',
  SERVICE_NAME = 'rest-api',
  DEPLOY_ENV = 'prod-dc',
  LOG_LEVEL = 'info',
  LOG_PATH = './logs',
  PORT = '8080',
} = process?.env || {};

const CONFIG: TConfig = {
  apiName: SERVICE_NAME,
  appPort: PORT,
  env: DEPLOY_ENV || API_ENV,
  debugMode: DEBUG_MODE,
  log: {
    level: LOG_LEVEL,
    filePath: LOG_PATH,
  },
};

export default CONFIG;
