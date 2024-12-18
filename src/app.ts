import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req, res) => {
  res.send('<h1>The role Script API...!!!</h1>');
});

export default app;
