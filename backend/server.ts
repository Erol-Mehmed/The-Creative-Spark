import express, { Express } from 'express';
import routes from './routes';
import cors from 'cors';

const app: Express = express();
const port: number = 3001;

app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
