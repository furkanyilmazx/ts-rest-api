"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 8000;
const a = 10;
console.log(a);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Sssddezrver is running at https://localhost:${PORT}`);
});
