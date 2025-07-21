import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getLandAssets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const landAssets = await prisma.land_assets.findMany({
      include: {
        households: true,
      },
    });
    res.json(landAssets);
  } catch (error) {
    console.error('Get land assets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLandAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const landAsset = await prisma.land_assets.findUnique({
      where: { land_asset_id: Number(id) },
      include: {
        households: true,
      },
    });

    if (!landAsset) {
      res.status(404).json({ error: 'Land asset not found' });
      return;
    }

    res.json(landAsset);
  } catch (error) {
    console.error('Get land asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLandAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { household_id, land_type, ownership_type, area_in_acres } = req.body;

    if (!household_id || !land_type || !ownership_type) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const landAsset = await prisma.land_assets.create({
      data: {
        household_id,
        land_type,
        ownership_type,
        area_in_acres: area_in_acres ? Number(area_in_acres) : null,
      },
    });

    res.status(201).json(landAsset);
  } catch (error) {
    console.error('Create land asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLandAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { household_id, land_type, ownership_type, area_in_acres } = req.body;

    const landAsset = await prisma.land_assets.update({
      where: { land_asset_id: Number(id) },
      data: {
        household_id,
        land_type,
        ownership_type,
        area_in_acres: area_in_acres ? Number(area_in_acres) : null,
      },
    });

    res.json(landAsset);
  } catch (error) {
    console.error('Update land asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLandAsset = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.land_assets.delete({
      where: { land_asset_id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete land asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
