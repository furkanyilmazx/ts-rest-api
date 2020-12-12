import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Response from './common/Response';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/health', (req, res) =>
  new Response<object>({
    status: StatusCodes.OK,
    result: '',
    pagination: { total: '21', page: '1', pageSize: '3' },
  }).send(res)
);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Ssssddezrver is running at http://localhost:${PORT}`);
});
