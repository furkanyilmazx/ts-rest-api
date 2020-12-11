"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { API_ENV, DEBUG_MODE, SERVICE_NAME, DEPLOY_ENV, LOG_LEVEL, LOG_PATH, PORT } = process.env;
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
exports.default = CONFIG;
