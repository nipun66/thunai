import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'thunai-super-secret-jwt-key-2024-production-ready';

// Create default users if none exist
const createDefaultUsers = async () => {
  try {
    console.log('🔧 Checking and creating default users...');
    
    // Test database connection first
    await prisma.$connect();
    
    // Create default roles first
    const roles = await prisma.roles.findMany();
    if (roles.length === 0) {
      console.log('📝 Creating default roles...');
      await prisma.roles.createMany({
        data: [
          { role_name: 'Enumerator', description: 'Kudumbashree Enumerator' },
          { role_name: 'Anganwadi Worker', description: 'Anganwadi Worker' },
          { role_name: 'Panchayath Officer', description: 'Panchayath Officer' },
          { role_name: 'District Officer', description: 'District Officer' },
          { role_name: 'Admin', description: 'System Administrator' }
        ]
      });
      console.log('✅ Default roles created');
    } else {
      console.log('✅ Default roles already exist');
    }
    
    const rolesList = await prisma.roles.findMany();
    const enumeratorRole = rolesList.find(r => r.role_name === 'Enumerator') || rolesList[0];
    const adminRole = rolesList.find(r => r.role_name === 'Admin') || rolesList[0];
    
    // Check if enumerator user exists
    const existingEnumerator = await prisma.users.findUnique({
      where: { phone_number: '1234567890' }
    });
    
    if (!existingEnumerator) {
      console.log('👤 Creating default enumerator user...');
      const password_hash = await bcrypt.hash('123456', 10);
      await prisma.users.create({
        data: {
          full_name: 'Default Enumerator',
          phone_number: '1234567890',
          password_hash,
          role_id: enumeratorRole.role_id,
          is_active: true
        }
      });
      console.log('✅ Default enumerator user created');
    } else {
      console.log('✅ Default enumerator user already exists');
    }
    
    // Check if admin user exists
    const existingAdmin = await prisma.users.findUnique({
      where: { phone_number: 'admin' }
    });
    
    if (!existingAdmin) {
      console.log('👑 Creating default admin user...');
      const admin_password_hash = await bcrypt.hash('admin123', 10);
      await prisma.users.create({
        data: {
          full_name: 'Default Admin',
          phone_number: 'admin',
          password_hash: admin_password_hash,
          role_id: adminRole.role_id,
          is_active: true
        }
      });
      console.log('✅ Default admin user created');
    } else {
      console.log('✅ Default admin user already exists');
    }
    
    console.log('🎉 Default users check completed');
    console.log('📋 Login Credentials:');
    console.log('   Enumerator - Phone: 1234567890, Password: 123456');
    console.log('   Admin      - Phone: admin, Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating default users:', error);
    console.log('⚠️  System will continue without default users');
  }
};

// Call this function when the server starts
createDefaultUsers();

export const register = async (req: Request, res: Response): Promise<void> => {
  (req as any).auditActionType = 'REGISTER';
  try {
    const { phone_number, password, role_id, full_name } = req.body;
    
    // Validate required fields
    if (!phone_number || !password || !role_id || !full_name) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['phone_number', 'password', 'role_id', 'full_name'],
        received: Object.keys(req.body)
      });
      return;
    }
    
    // Validate phone number format
    if (!/^\d{10}$/.test(phone_number)) {
      res.status(400).json({ error: 'Phone number must be 10 digits' });
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long' });
      return;
    }
    
    // Check if user already exists
    const existing = await prisma.users.findUnique({ where: { phone_number } });
    if (existing) {
      res.status(409).json({ error: 'Phone number already registered' });
      return;
    }
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.users.create({
      data: { 
        phone_number, 
        password_hash, 
        role_id: Number(role_id), 
        full_name,
        is_active: true
      },
    });
    
    console.log(`✅ User registered successfully: ${user.phone_number}`);
    
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully',
      user: {
        user_id: user.user_id, 
        phone_number: user.phone_number, 
        full_name: user.full_name,
        role_id: user.role_id 
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  (req as any).auditActionType = 'LOGIN';
  try {
    const { phone_number, password } = req.body;
    
    // Validate required fields
    if (!phone_number || !password) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['phone_number', 'password']
      });
      return;
    }
    
    // Find user with role information
    const user = await prisma.users.findUnique({ 
      where: { phone_number },
      include: { roles: true }
    });
    
    if (!user) {
      res.status(401).json({ error: 'Invalid phone number or password' });
      return;
    }
    
    // Check if user is active
    if (!user.is_active) {
      res.status(401).json({ error: 'Account is deactivated. Please contact administrator.' });
      return;
    }
    
    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ error: 'Invalid phone number or password' });
      return;
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.user_id, 
        roleId: user.role_id,
        phoneNumber: user.phone_number
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    console.log(`✅ User logged in successfully: ${user.phone_number}`);
    
    res.json({ 
      success: true,
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        phone_number: user.phone_number,
        role_id: user.role_id,
        role_name: user.roles.role_name
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    const user = await prisma.users.findUnique({
      where: { user_id: decoded.userId },
      include: { roles: true }
    });
    
    if (!user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    
    res.json({
      success: true,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        phone_number: user.phone_number,
        role_id: user.role_id,
        role_name: user.roles.role_name
      }
    });
  } catch (error) {
    console.error('❌ Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}; 