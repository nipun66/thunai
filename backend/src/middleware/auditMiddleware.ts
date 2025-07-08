import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export function auditLog(actionType: string) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      const timestamp = new Date().toISOString();
      const userId = req.user?.userId || 'anonymous';
      const userPhone = req.user?.phoneNumber || 'unknown';
      const method = req.method;
      const url = req.originalUrl;
      const ip = req.ip || req.connection.remoteAddress || 'unknown';
      
      // Try to extract device info from headers (User-Agent, etc.)
      const userAgent = req.headers['user-agent'] || 'unknown';
      // Optionally, add more device fingerprinting here if needed

      // Mask sensitive fields in body for audit log
      const maskSensitive = (obj: any) => {
        if (!obj || typeof obj !== 'object') return obj;
        const clone = { ...obj };
        ['password', 'token', 'accessToken', 'refreshToken'].forEach(f => {
          if (clone[f]) clone[f] = '[MASKED]';
        });
        return clone;
      };
      const bodyForLog = req.method !== 'GET' ? JSON.stringify(maskSensitive(req.body)) : '';
      const queryForLog = req.query && Object.keys(req.query).length ? JSON.stringify(req.query) : '';

      // Log response status after response is sent
      res.on('finish', async () => {
        try {
          await prisma.audit_logs.create({
            data: {
              timestamp: new Date(timestamp),
              action_type: actionType,
              method,
              url,
              user_id: userId !== 'anonymous' ? userId : undefined,
              user_phone: userPhone,
              ip,
              user_agent: userAgent,
              request_body: bodyForLog,
              query_params: queryForLog,
              status_code: res.statusCode,
            },
          });
        } catch (err) {
          console.error('❌ Failed to persist audit log:', err);
        }
        console.log(
          `[AUDIT] ${timestamp} - ${actionType} - ${method} ${url} by user ${userId} (${userPhone}) from ${ip} | Device: ${userAgent}` +
          (bodyForLog ? ` | Body: ${bodyForLog}` : '') +
          (queryForLog ? ` | Query: ${queryForLog}` : '') +
          ` | Status: ${res.statusCode}`
        );
      });
      
      next();
    } catch (error) {
      console.error('❌ Audit logging error:', error);
      // Don't block the request if audit logging fails
      next();
    }
  };
}