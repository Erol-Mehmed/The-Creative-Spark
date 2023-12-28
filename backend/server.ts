import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port: number = 3001;

const test: number = 10;
console.log(test);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});