import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { routeNotFound } from './app/middleware/routeNotFound';
import { userRoute } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Routes

app.use('/api/v1/users', userRoute);

app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running...');
});

// 404 Route
app.use('*', routeNotFound);

// Error Handler
app.use(globalErrorHandler);
export default app;
