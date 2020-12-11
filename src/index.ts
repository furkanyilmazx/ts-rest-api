import express from 'express';

import configs from '@project/configs/configs';

const app = express();
const PORT = 8000;

const a = 10;

console.log(a);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Sssddezrver is running at https://localhost:${PORT}`);
});
