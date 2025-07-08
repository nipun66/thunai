import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

const memberSchema = z.object({
  household_id: z.string().uuid(),
  name: z.string().max(150),
  aadhaar_number: z.string().max(16).optional(),
  date_of_birth: z.string().transform(str => new Date(str)),
  gender: z.string().max(20),
  relation_to_head: z.string().max(50),
  marital_status: z.string().max(50).optional(),
  age: z.number().optional(),
  general_education_level: z.string().max(100).optional(),
  vocational_knowledge: z.string().optional(),
  occupation_sector: z.string().max(100).optional(),
  bank_account: z.boolean().optional(),
  has_aadhaar: z.boolean().optional(),
  pension: z.string().max(100).optional(),
  additional_details: z.string().optional(),
});

async function getEnumeratorHamletId(userId: string) {
  const enumerator = await prisma.users.findUnique({
    where: { user_id: userId },
    select: {
      households: {
        select: { hamlet_id: true },
        take: 1,
      },
    },
  });
  return enumerator?.households[0]?.hamlet_id;
}

export const getMembers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const members = await prisma.members.findMany({
      include: {
        households: true,
      },
    });
    res.json(members);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
  const { member_id } = req.params;
    const member = await prisma.members.findUnique({
      where: { member_id },
      include: {
        households: true,
      },
    });
    
    if (!member) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    
    res.json(member);
  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
  const parse = memberSchema.safeParse(req.body);
  if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }
    
    const member = await prisma.members.create({
      data: {
        household_id: parse.data.household_id,
        name: parse.data.name,
        aadhaar_number: parse.data.aadhaar_number,
        date_of_birth: parse.data.date_of_birth,
        gender: parse.data.gender,
        relation_to_head: parse.data.relation_to_head,
        marital_status: parse.data.marital_status,
        age: parse.data.age,
        general_education_level: parse.data.general_education_level,
        vocational_knowledge: parse.data.vocational_knowledge,
        occupation_sector: parse.data.occupation_sector,
        bank_account: parse.data.bank_account,
        has_aadhaar: parse.data.has_aadhaar,
        pension: parse.data.pension,
        additional_details: parse.data.additional_details,
      },
      include: {
        households: true,
      },
    });
    
    res.status(201).json(member);
  } catch (error) {
    console.error('Create member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
  const { member_id } = req.params;
  const parse = memberSchema.partial().safeParse(req.body);
    
  if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }
    
    const member = await prisma.members.update({
      where: { member_id },
      data: {
        household_id: parse.data.household_id,
        name: parse.data.name,
        aadhaar_number: parse.data.aadhaar_number,
        date_of_birth: parse.data.date_of_birth,
        gender: parse.data.gender,
        relation_to_head: parse.data.relation_to_head,
        marital_status: parse.data.marital_status,
        age: parse.data.age,
        general_education_level: parse.data.general_education_level,
        vocational_knowledge: parse.data.vocational_knowledge,
        occupation_sector: parse.data.occupation_sector,
        bank_account: parse.data.bank_account,
        has_aadhaar: parse.data.has_aadhaar,
        pension: parse.data.pension,
        additional_details: parse.data.additional_details,
      },
      include: {
        households: true,
      },
    });
    
    res.json(member);
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
  const { member_id } = req.params;
    
    await prisma.members.delete({
      where: { member_id },
    });
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 