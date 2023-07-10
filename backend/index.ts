import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
// import { router as routes }  from './routes/routes';

const mongoString: string = process.env['DATABASE_URL'] !== undefined ? process.env['DATABASE_URL'] : '';

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

app.use(express.json());
// app.use('/api', routes);

app.listen(3000, () => {
  console.log(`Server started at ${3000}`);
});
