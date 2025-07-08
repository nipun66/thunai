import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'THUNAI backend is running.' });
});

// TODO: Add SRS-exact routes, RBAC, and data models here

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`THUNAI backend running on port ${PORT}`);
}); 