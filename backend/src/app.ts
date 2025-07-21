import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import householdRoutes from './routes/householdRoutes';
import memberRoutes from './routes/memberRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import foodConsumptionRoutes from './routes/foodConsumptionRoutes';
import forestResourcesRoutes from './routes/forestResourcesRoutes';
import cashCropsRoutes from './routes/cashCropsRoutes';
import nutritionAccessRoutes from './routes/nutritionAccessRoutes';
import healthConditionRoutes from './routes/healthConditionRoutes';
import wasteManagementRoutes from './routes/wasteManagementRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration for PWA and Dashboard
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Dashboard
      'http://localhost:5173', // PWA
      'http://localhost:4173', // PWA preview
      'https://thunai-dashboard.vercel.app', // Production dashboard
      'https://thunai-pwa.vercel.app', // Production PWA
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

// Rate limiting (commented out for now - can be enabled later)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api/', limiter);

// JSON parsing middleware with error handling
app.use(
  express.json({
    limit: '10mb',
    verify: (req: any, res: any, buf: Buffer) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        console.error('JSON parsing error:', e);
        res.status(400).json({
          error: 'Invalid JSON format',
          details:
            'The request body contains malformed JSON. Please check for special characters or invalid syntax.',
          receivedData: buf.toString().substring(0, 200) + '...',
        });
        return;
      }
    },
  }),
);

app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'THUNAI Backend API',
    version: '1.0.0',
  });
});

// API routes
app.use('/api/households', householdRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/food-consumption', foodConsumptionRoutes);
app.use('/api/forest-resources', forestResourcesRoutes);
app.use('/api/cash-crops', cashCropsRoutes);
app.use('/api/nutrition-access', nutritionAccessRoutes);
app.use('/api/health-conditions', healthConditionRoutes);
app.use('/api/waste-management', wasteManagementRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.originalUrl} does not exist.`,
    availableEndpoints: [
      'GET /health',
      'GET /api/households',
      'GET /api/households/:id',
      'GET /api/households/stats',
      'POST /api/households',
      'PUT /api/households/:id',
      'DELETE /api/households/:id',
      'GET /api/members',
      'POST /api/members',
      'GET /api/dashboard/stats',
      'GET /api/dashboard/recent-activity',
      'GET /api/dashboard/reports',
      'POST /api/auth/login',
      'POST /api/auth/register',
    ],
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
