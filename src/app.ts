import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { z } from 'zod';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      message: error.errors.map((err) => err.message).join(', '),
    });
  } else if (error instanceof Error) {
    res.status(500).json({ success: false, message: error.message });
  } else {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
export default app;
