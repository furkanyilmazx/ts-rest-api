import dotenv from 'dotenv';

dotenv.config();

const {API_ENV, DEBUG_MODE, SERVICE_NAME, DEPLOY_ENV, LOG_LEVEL, LOG_PATH, PORT} = process.env;

const CONFIG = {
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
