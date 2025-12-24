import express, { Express } from 'express';
import cors from 'cors';
import applicationMatchRoutes from './routes/applicationMatch';

export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/applications', applicationMatchRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return app;
}
