import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

const employmentSchema = z.object({
  household_id: z.string().uuid(),
  member_name: z.string().max(150).optional(),
  age: z.number().optional(),
  employment_exchange: z.string().max(200).optional(),
  registered_psc: z.boolean().optional(),
  dwms: z.string().max(100).optional(),
  additional_details: z.string().optional(),
});

async function getEnumeratorHamletId(userId: string) {
  const assignment = await prisma.user_location_assignments.findFirst({ where: { user_id: userId, hamlet_id: { not: null } }, select: { hamlet_id: true } });
  return assignment?.hamlet_id;
}

export const getEmploymentDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const employment = await prisma.employment_details.findMany({
      include: {
        households: true,
      },
    });
    res.json(employment);
  } catch (error) {
    console.error('Get employment details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEmploymentDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employment_id } = req.params;
    const employment = await prisma.employment_details.findUnique({
      where: { employment_id: Number(employment_id) },
      include: {
        households: true,
      },
    });
    
    if (!employment) {
      res.status(404).json({ error: 'Employment detail not found' });
      return;
    }
    
    res.json(employment);
  } catch (error) {
    console.error('Get employment detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createEmploymentDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
  const parse = employmentSchema.safeParse(req.body);
  if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }
    
    const employment = await prisma.employment_details.create({
      data: {
        household_id: parse.data.household_id,
        member_name: parse.data.member_name,
        age: parse.data.age,
        employment_exchange: parse.data.employment_exchange,
        registered_psc: parse.data.registered_psc,
        dwms: parse.data.dwms,
        additional_details: parse.data.additional_details,
      },
      include: {
        households: true,
      },
    });
    
    res.status(201).json(employment);
  } catch (error) {
    console.error('Create employment detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateEmploymentDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employment_id } = req.params;
  const parse = employmentSchema.partial().safeParse(req.body);
    
  if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }
    
    const employment = await prisma.employment_details.update({
      where: { employment_id: Number(employment_id) },
      data: {
        household_id: parse.data.household_id,
        member_name: parse.data.member_name,
        age: parse.data.age,
        employment_exchange: parse.data.employment_exchange,
        registered_psc: parse.data.registered_psc,
        dwms: parse.data.dwms,
        additional_details: parse.data.additional_details,
      },
      include: {
        households: true,
      },
    });
    
    res.json(employment);
  } catch (error) {
    console.error('Update employment detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteEmploymentDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employment_id } = req.params;
    
    await prisma.employment_details.delete({
      where: { employment_id: Number(employment_id) },
    });
    
    res.json({ message: 'Employment detail deleted successfully' });
  } catch (error) {
    console.error('Delete employment detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 