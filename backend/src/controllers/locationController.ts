import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// District
export const getDistricts = async (req: Request, res: Response): Promise<void> => {
  try {
    const districts = await prisma.districts.findMany();
    res.json(districts);
  } catch (error) {
    console.error('Get districts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDistrict = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const district = await prisma.districts.create({ data: { name } });
    res.status(201).json(district);
  } catch (error) {
    console.error('Create district error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Block
export const getBlocks = async (req: Request, res: Response): Promise<void> => {
  try {
    const blocks = await prisma.blocks.findMany();
    res.json(blocks);
  } catch (error) {
    console.error('Get blocks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, district_id } = req.body;
    const block = await prisma.blocks.create({ data: { name, district_id } });
    res.status(201).json(block);
  } catch (error) {
    console.error('Create block error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Panchayat
export const getPanchayats = async (req: Request, res: Response): Promise<void> => {
  try {
    const panchayats = await prisma.panchayats.findMany();
    res.json(panchayats);
  } catch (error) {
    console.error('Get panchayats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPanchayat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, block_id } = req.body;
    const panchayat = await prisma.panchayats.create({ data: { name, block_id } });
    res.status(201).json(panchayat);
  } catch (error) {
    console.error('Create panchayat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Hamlet
export const getHamlets = async (req: Request, res: Response): Promise<void> => {
  try {
    const hamlets = await prisma.hamlets.findMany();
    res.json(hamlets);
  } catch (error) {
    console.error('Get hamlets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createHamlet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, panchayat_id } = req.body;
    const hamlet = await prisma.hamlets.create({ data: { name, panchayat_id } });
    res.status(201).json(hamlet);
  } catch (error) {
    console.error('Create hamlet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
