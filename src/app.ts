import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandler from './middlewares/error';
import productRoute from './routes/products.route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(productRoute);
app.use(errorHandler);

export default app;
