import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Routes

app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running...');
});

export default app;
