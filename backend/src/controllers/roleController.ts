import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
  } catch (error) {
    console.error('Get roles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role_name, description } = req.body;
    const role = await prisma.roles.create({ data: { role_name, description } });
    res.status(201).json(role);
  } catch (error) {
    console.error('Create role error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
