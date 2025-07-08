import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'thunai-super-secret-jwt-key-2024-production-ready';

export interface AuthRequest extends Request {
  user?: { 
    userId: string; 
    roleId: number; 
    phoneNumber?: string;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ error: 'Authorization header missing' });
      return;
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Invalid authorization format. Use Bearer token' });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'Token missing' });
      return;
    }
    
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { 
        userId: string; 
        roleId: number; 
        phoneNumber?: string;
      };
      
      req.user = payload;
      next();
    } catch (jwtError) {
      console.error('❌ JWT verification failed:', jwtError);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('❌ Authentication middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}; 