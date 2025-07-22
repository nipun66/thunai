import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const requireRole = (allowedRoles: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    // Check both roleId and role_id for compatibility
    const userRole = (req.user as any).roleId ?? (req.user as any).role_id;
    if (!allowedRoles.includes(Number(userRole))) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
};
