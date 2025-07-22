import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerDef';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import householdRoutes from './routes/householdRoutes';
import locationRoutes from './routes/locationRoutes';
import memberRoutes from './routes/memberRoutes';
import landAssetRoutes from './routes/landAssetRoutes';
import housingRoutes from './routes/housingRoutes';
import sanitationRoutes from './routes/sanitationRoutes';
import educationRoutes from './routes/educationRoutes';
import employmentRoutes from './routes/employmentRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

// Import middleware
import { auditLog } from './middleware/auditMiddleware';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Create Express app
const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  }),
);

// CORS configuration for PWA and Dashboard
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Dashboard (old port)
      'http://localhost:3001', // Dashboard (new port)
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

// JSON parsing middleware with robust error handling
app.use(
  express.json({
    limit: '10mb',
    verify: (req: any, res: any, buf: Buffer) => {
      try {
        if (buf.length > 0) {
          // Sanitize the buffer by removing control characters
          const sanitizedBuffer = Buffer.from(buf.toString().replace(/[\x00-\x1F\x7F-\x9F]/g, ''));
          JSON.parse(sanitizedBuffer.toString());
        }
      } catch (e) {
        console.error('JSON parsing error:', e);
        console.error('Received body:', buf.toString().substring(0, 200) + '...');
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

// Database connection test
const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Create default users and required data if they don't exist
const createDefaultUsers = async () => {
  try {
    console.log('🔧 Setting up default data for production...');

    // Step 1: Create default roles first
    console.log('1️⃣ Creating default roles...');
    const roles = [
      { role_id: 1, role_name: 'Admin', description: 'System Administrator' },
      { role_id: 2, role_name: 'Enumerator', description: 'Kudumbashree Enumerator' },
      { role_id: 3, role_name: 'Anganwadi', description: 'Anganwadi Worker' },
      { role_id: 4, role_name: 'ST Promoter', description: 'ST Promoter' },
      { role_id: 5, role_name: 'ASHA Worker', description: 'ASHA Worker' },
      { role_id: 6, role_name: 'Panchayath Officer', description: 'Panchayath Officer' },
      { role_id: 7, role_name: 'District Officer', description: 'District/Block Officers' },
    ];

    for (const role of roles) {
      try {
        await prisma.roles.upsert({
          where: { role_id: role.role_id },
          update: {},
          create: role,
        });
      } catch (error) {
        // If upsert fails due to unique constraint, try to find existing role
        const existingRole = await prisma.roles.findFirst({
          where: { role_name: role.role_name },
        });
        if (!existingRole) {
          console.log(`Creating role: ${role.role_name}`);
          await prisma.roles.create({ data: role });
        }
      }
    }
    console.log('✅ Default roles checked/created');

    // Step 2: Create default admin user
    console.log('2️⃣ Creating default admin user...');
    const existingUser = await prisma.users.findFirst({
      where: { phone_number: 'admin@thunai.com' },
    });

    let adminUserId: string;
    if (!existingUser) {
      const adminUser = await prisma.users.create({
        data: {
          full_name: 'Admin User',
          phone_number: 'admin@thunai.com',
          password_hash: 'admin123', // In production, this should be hashed
          role_id: 1, // Admin role
          is_active: true,
        },
      });
      adminUserId = adminUser.user_id;
      console.log('✅ Default admin user created:', adminUserId);
    } else {
      adminUserId = existingUser.user_id;
      console.log('✅ Default admin user exists:', adminUserId);
    }

    // Step 3: Create default location hierarchy
    console.log('3️⃣ Creating default location hierarchy...');

    // Create default district
    const defaultDistrict = await prisma.districts.upsert({
      where: { district_id: 1 },
      update: {},
      create: {
        district_id: 1,
        name: 'Default District',
      },
    });
    console.log('✅ Default district created/updated:', defaultDistrict.district_id);

    // Create default block
    const defaultBlock = await prisma.blocks.upsert({
      where: { block_id: 1 },
      update: {},
      create: {
        block_id: 1,
        name: 'Default Block',
        district_id: 1,
      },
    });
    console.log('✅ Default block created/updated:', defaultBlock.block_id);

    // Create default panchayat
    const defaultPanchayat = await prisma.panchayats.upsert({
      where: { panchayat_id: 1 },
      update: {},
      create: {
        panchayat_id: 1,
        name: 'Default Panchayat',
        block_id: 1,
      },
    });
    console.log('✅ Default panchayat created/updated:', defaultPanchayat.panchayat_id);

    // Create default hamlet
    const defaultHamlet = await prisma.hamlets.upsert({
      where: { hamlet_id: 1 },
      update: {},
      create: {
        hamlet_id: 1,
        name: 'Default Hamlet',
        panchayat_id: 1,
      },
    });
    console.log('✅ Default hamlet created/updated:', defaultHamlet.hamlet_id);

    // Step 4: Create a system user for PWA submissions
    console.log('4️⃣ Creating system user for PWA submissions...');
    const systemUser = await prisma.users.upsert({
      where: { phone_number: 'system@thunai.com' },
      update: {},
      create: {
        full_name: 'System User',
        phone_number: 'system@thunai.com',
        password_hash: 'system123',
        role_id: 2, // Enumerator role
        is_active: true,
      },
    });
    console.log('✅ System user created/updated:', systemUser.user_id);

    // Step 5: Store the system user ID for PWA to use
    global.SYSTEM_USER_ID = systemUser.user_id;
    global.DEFAULT_HAMLET_ID = 1;

    console.log('🎉 All default data setup complete!');
    console.log('📊 System is ready for PWA submissions');
    console.log('🔑 System User ID:', systemUser.user_id);
    console.log('🏘️ Default Hamlet ID: 1');
  } catch (error) {
    console.error('❌ Error creating default users:', error);
    throw error; // Re-throw to prevent server startup with incomplete data
  }
};

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
  try {
    const dbConnected = await testDatabaseConnection();

    res.json({
      status: dbConnected ? 'OK' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      service: 'THUNAI Backend API',
      version: '1.0.0',
      database: dbConnected ? 'connected' : 'disconnected',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        households: '/api/households',
        members: '/api/members',
        education: '/api/education-details',
        employment: '/api/employment-details',
        housing: '/api/housing-details',
        sanitation: '/api/sanitation',
        locations: '/api/locations',
        roles: '/api/roles',
        dashboard: '/api/dashboard',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'THUNAI Backend API is running! 🚀',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      households: '/api/households',
      members: '/api/members',
      education: '/api/education-details',
      employment: '/api/employment-details',
      housing: '/api/housing-details',
      sanitation: '/api/sanitation',
      locations: '/api/locations',
      roles: '/api/roles',
      dashboard: '/api/dashboard',
    },
  });
});

// Audit logging
app.use(auditLog('API_CALL'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/households', householdRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/land-assets', landAssetRoutes);
app.use('/api/housing-details', housingRoutes);
app.use('/api/sanitation', sanitationRoutes);
app.use('/api/education-details', educationRoutes);
app.use('/api/employment-details', employmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- Swagger UI integration (SAFE, NO CRASH) ---
try {
  if (swaggerSpec && typeof swaggerSpec === 'object') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('✅ Swagger UI available at /api-docs');
  } else {
    console.warn('⚠️  Swagger spec is not a valid object, /api-docs not enabled');
  }
} catch (err) {
  console.warn('⚠️  Swagger UI not loaded:', err?.message || err);
}

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.originalUrl} does not exist.`,
    availableEndpoints: [
      'GET /health',
      'GET /api/households',
      'GET /api/households/:id',
      'POST /api/households',
      'PUT /api/households/:id',
      'DELETE /api/households/:id',
      'GET /api/members',
      'POST /api/members',
      'POST /api/auth/login',
      'POST /api/auth/register',
    ],
  });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', error);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(500).json({
    error: 'Internal server error',
    message: isDevelopment
      ? error.message || 'An unexpected error occurred'
      : 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    ...(isDevelopment && { stack: error.stack }),
  });
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  try {
    await prisma.$disconnect();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    console.log('🔧 Checking and creating default users...');
    await createDefaultUsers();

    // Test database connection first
    const dbConnected = await testDatabaseConnection();

    if (!dbConnected) {
      console.log('⚠️  Starting server with degraded database connection...');
    }

    app.listen(PORT, () => {
      console.log(`🚀 THUNAI backend running on port ${PORT}`);
      console.log(`📊 Health check available at: http://localhost:${PORT}/health`);
      console.log(`📚 API documentation available at: http://localhost:${PORT}/`);
      console.log(`🔗 Dashboard URL: http://localhost:3000`);
      console.log(`📱 PWA URL: http://localhost:5173`);

      if (dbConnected) {
        console.log('✅ System is fully operational');
      } else {
        console.log('⚠️  System running in degraded mode - database connection issues');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export { prisma };
