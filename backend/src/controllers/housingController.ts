import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// SRS-compliant housing details schema (simplified, expand as needed)
const housingSchema = z.object({
  household_id: z.string().uuid(),
  completion_status: z.string().max(100).optional(),
  age_of_house: z.number().optional(),
  current_condition: z.string().max(100).optional(),
  roof_material: z.string().max(100).optional(),
  roof_condition: z.string().max(100).optional(),
  roof_budget: z.number().optional(),
  wall_material: z.string().max(100).optional(),
  wall_condition: z.string().max(100).optional(),
  wall_budget: z.number().optional(),
  floor_material: z.string().max(100).optional(),
  floor_needs_repair: z.boolean().optional(),
  floor_budget: z.number().optional(),
  door_condition: z.string().max(100).optional(),
  good_doors_count: z.number().optional(),
  window_condition: z.string().max(100).optional(),
  good_windows_count: z.number().optional(),
  door_window_budget: z.number().optional(),
  kitchen_ventilation: z.string().max(100).optional(),
  kitchen_appliances: z.string().optional(),
  kitchen_budget: z.number().optional(),
});

async function getEnumeratorHamletId(userId: string) {
  const assignment = await prisma.user_location_assignments.findFirst({
    where: { user_id: userId, hamlet_id: { not: null } },
    select: { hamlet_id: true },
  });
  return assignment?.hamlet_id;
}

export const getHousingDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const housing = await prisma.housing_details.findMany({
      include: {
        households: true,
      },
    });
    res.json(housing);
  } catch (error) {
    console.error('Get housing details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHousingDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { housing_id } = req.params;
    const housing = await prisma.housing_details.findUnique({
      where: { housing_id: Number(housing_id) },
      include: {
        households: true,
      },
    });

    if (!housing) {
      res.status(404).json({ error: 'Housing detail not found' });
      return;
    }

    res.json(housing);
  } catch (error) {
    console.error('Get housing detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createHousingDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parse = housingSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }

    const housing = await prisma.housing_details.create({
      data: {
        household_id: parse.data.household_id,
        completion_status: parse.data.completion_status,
        age_of_house: parse.data.age_of_house,
        current_condition: parse.data.current_condition,
        roof_material: parse.data.roof_material,
        roof_condition: parse.data.roof_condition,
        roof_budget: parse.data.roof_budget,
        wall_material: parse.data.wall_material,
        wall_condition: parse.data.wall_condition,
        wall_budget: parse.data.wall_budget,
        floor_material: parse.data.floor_material,
        floor_needs_repair: parse.data.floor_needs_repair,
        floor_budget: parse.data.floor_budget,
        door_condition: parse.data.door_condition,
        good_doors_count: parse.data.good_doors_count,
        window_condition: parse.data.window_condition,
        good_windows_count: parse.data.good_windows_count,
        door_window_budget: parse.data.door_window_budget,
        kitchen_ventilation: parse.data.kitchen_ventilation,
        kitchen_appliances: parse.data.kitchen_appliances,
        kitchen_budget: parse.data.kitchen_budget,
      },
      include: {
        households: true,
      },
    });

    res.status(201).json(housing);
  } catch (error) {
    console.error('Create housing detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateHousingDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { housing_id } = req.params;
    const parse = housingSchema.partial().safeParse(req.body);

    if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }

    const housing = await prisma.housing_details.update({
      where: { housing_id: Number(housing_id) },
      data: {
        household_id: parse.data.household_id,
        completion_status: parse.data.completion_status,
        age_of_house: parse.data.age_of_house,
        current_condition: parse.data.current_condition,
        roof_material: parse.data.roof_material,
        roof_condition: parse.data.roof_condition,
        roof_budget: parse.data.roof_budget,
        wall_material: parse.data.wall_material,
        wall_condition: parse.data.wall_condition,
        wall_budget: parse.data.wall_budget,
        floor_material: parse.data.floor_material,
        floor_needs_repair: parse.data.floor_needs_repair,
        floor_budget: parse.data.floor_budget,
        door_condition: parse.data.door_condition,
        good_doors_count: parse.data.good_doors_count,
        window_condition: parse.data.window_condition,
        good_windows_count: parse.data.good_windows_count,
        door_window_budget: parse.data.door_window_budget,
        kitchen_ventilation: parse.data.kitchen_ventilation,
        kitchen_appliances: parse.data.kitchen_appliances,
        kitchen_budget: parse.data.kitchen_budget,
      },
      include: {
        households: true,
      },
    });

    res.json(housing);
  } catch (error) {
    console.error('Update housing detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteHousingDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { housing_id } = req.params;

    await prisma.housing_details.delete({
      where: { housing_id: Number(housing_id) },
    });

    res.json({ message: 'Housing detail deleted successfully' });
  } catch (error) {
    console.error('Delete housing detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
