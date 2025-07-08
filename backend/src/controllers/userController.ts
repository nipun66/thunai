import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        phone_number: true,
        full_name: true,
        role_id: true,
        created_at: true,
      },
    });
  res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        phone_number: true,
        full_name: true,
        role_id: true,
        created_at: true,
      },
    });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
  res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const { phone_number, full_name, role_id } = req.body;
    
    const user = await prisma.users.update({ 
      where: { user_id }, 
      data: { phone_number, full_name, role_id } 
    });
    
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    await prisma.users.delete({ where: { user_id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 