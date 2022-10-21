import express from 'express';
import cars from './routes/cars';

const app = express();
app.use(express.json);
app.use(cars);

export default app;
