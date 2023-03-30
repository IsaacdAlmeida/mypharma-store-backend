import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import productRoute from './routes/products.route';

const app = express();
app.use(express.json());
app.use(productRoute);
app.use(errorHandler);

export default app;
