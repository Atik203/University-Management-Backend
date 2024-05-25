import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
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
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler
app.use(globalErrorHandler);
export default app;
