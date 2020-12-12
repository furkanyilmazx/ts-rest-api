import express from 'express';

const app = express();
const PORT = 8080;

const a = 10;

console.log(a);

app.get('/health', (req, res) => res.send('up'));
app.listen(process.env.PORT || PORT, () => {
  console.log(`⚡️[server]: Ssssddezrver is running at http://localhost:${PORT}`);
});
