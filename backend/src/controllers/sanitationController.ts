import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

const sanitationSchema = z.object({
  household_id: z.string().uuid(),
  has_toilet: z.boolean().optional(),
  has_bathroom: z.boolean().optional(),
  all_use_toilet: z.boolean().optional(),
  uses_public_toilet: z.boolean().optional(),
  satisfied_with_public: z.boolean().optional(),
  public_toilet_quality: z.string().max(100).optional(),
  distance_to_water: z.number().optional(),
  toilet_tank_type: z.string().max(100).optional(),
  toilet_closet_type: z.string().max(100).optional(),
  toilet_roof_material: z.string().max(100).optional(),
  toilet_wall_type: z.string().max(100).optional(),
  toilet_door_type: z.string().max(100).optional(),
  toilet_floor_type: z.string().max(100).optional(),
  water_availability: z.string().max(100).optional(),
  additional_notes: z.string().optional(),
  estimated_budget: z.number().optional(),
});

export const getSanitationDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sanitation = await prisma.sanitation_facilities.findMany({
      include: {
        households: true,
      },
    });
    res.json(sanitation);
  } catch (error) {
    console.error('Get sanitation details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSanitationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { facility_id } = req.params;
    const sanitation = await prisma.sanitation_facilities.findUnique({
      where: { facility_id: Number(facility_id) },
      include: {
        households: true,
      },
    });

    if (!sanitation) {
      res.status(404).json({ error: 'Sanitation detail not found' });
      return;
    }

    res.json(sanitation);
  } catch (error) {
    console.error('Get sanitation detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSanitationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parse = sanitationSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }

    const sanitation = await prisma.sanitation_facilities.create({
      data: {
        household_id: parse.data.household_id,
        has_toilet: parse.data.has_toilet,
        has_bathroom: parse.data.has_bathroom,
        all_use_toilet: parse.data.all_use_toilet,
        uses_public_toilet: parse.data.uses_public_toilet,
        satisfied_with_public: parse.data.satisfied_with_public,
        public_toilet_quality: parse.data.public_toilet_quality,
        distance_to_water: parse.data.distance_to_water,
        toilet_tank_type: parse.data.toilet_tank_type,
        toilet_closet_type: parse.data.toilet_closet_type,
        toilet_roof_material: parse.data.toilet_roof_material,
        toilet_wall_type: parse.data.toilet_wall_type,
        toilet_door_type: parse.data.toilet_door_type,
        toilet_floor_type: parse.data.toilet_floor_type,
        water_availability: parse.data.water_availability,
        additional_notes: parse.data.additional_notes,
        estimated_budget: parse.data.estimated_budget,
      },
      include: {
        households: true,
      },
    });

    res.status(201).json(sanitation);
  } catch (error) {
    console.error('Create sanitation detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSanitationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { facility_id } = req.params;
    const parse = sanitationSchema.partial().safeParse(req.body);

    if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }

    const sanitation = await prisma.sanitation_facilities.update({
      where: { facility_id: Number(facility_id) },
      data: {
        household_id: parse.data.household_id,
        has_toilet: parse.data.has_toilet,
        has_bathroom: parse.data.has_bathroom,
        all_use_toilet: parse.data.all_use_toilet,
        uses_public_toilet: parse.data.uses_public_toilet,
        satisfied_with_public: parse.data.satisfied_with_public,
        public_toilet_quality: parse.data.public_toilet_quality,
        distance_to_water: parse.data.distance_to_water,
        toilet_tank_type: parse.data.toilet_tank_type,
        toilet_closet_type: parse.data.toilet_closet_type,
        toilet_roof_material: parse.data.toilet_roof_material,
        toilet_wall_type: parse.data.toilet_wall_type,
        toilet_door_type: parse.data.toilet_door_type,
        toilet_floor_type: parse.data.toilet_floor_type,
        water_availability: parse.data.water_availability,
        additional_notes: parse.data.additional_notes,
        estimated_budget: parse.data.estimated_budget,
      },
      include: {
        households: true,
      },
    });

    res.json(sanitation);
  } catch (error) {
    console.error('Update sanitation detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSanitationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { facility_id } = req.params;

    await prisma.sanitation_facilities.delete({
      where: { facility_id: Number(facility_id) },
    });

    res.json({ message: 'Sanitation detail deleted successfully' });
  } catch (error) {
    console.error('Delete sanitation detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
