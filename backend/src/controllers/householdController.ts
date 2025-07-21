import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AuthRequest } from '../middleware/authMiddleware';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schemas
const householdSchema = z.object({
  hamlet_id: z.number(),
  household_head_name: z.string().max(150),
  address: z.string().optional(),
  post_office: z.string().max(100).optional(),
  colony_settlement_name: z.string().max(150).optional(),
  category: z.string().max(50).optional(),
  micro_plan_number: z.string().max(50).optional(),
  grama_panchayat: z.string().max(100).optional(),
  ward_number: z.string().max(20).optional(),
  house_number: z.string().max(50).optional(),
  family_members_count: z.number().optional(),
  ration_card_number: z.string().max(50).optional(),
  survey_date: z.string().transform((str) => new Date(str)),
  enumerator_id: z.string().uuid(),
  local_id: z.string().max(255).optional(),
});

const memberSchema = z.object({
  name: z.string().max(150),
  aadhaar_number: z.string().max(16).optional(),
  date_of_birth: z.string().transform((str) => new Date(str)),
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

const householdWithMembersSchema = householdSchema.extend({
  members: z.array(memberSchema).optional(),
});

// Get all households with pagination and filtering (public access)
export const getHouseholds = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const category = req.query.category as string;
    const panchayat = req.query.panchayat as string;
    const hamlet = req.query.hamlet as string;

    const skip = (page - 1) * limit;

    // Build where clause
    const whereClause: any = { is_deleted: false };

    if (search) {
      whereClause.OR = [
        { household_head_name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { ration_card_number: { contains: search, mode: 'insensitive' } },
        { grama_panchayat: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      whereClause.category = category;
    }

    if (panchayat) {
      whereClause.grama_panchayat = panchayat;
    }

    if (hamlet) {
      whereClause.hamlet_id = parseInt(hamlet);
    }

    // Get total count
    const total = await prisma.households.count({ where: whereClause });

    // Get households with pagination
    const households = await prisma.households.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        members: {
          where: { is_deleted: false },
          take: 5,
        },
        hamlets: true,
      },
    });

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      households,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('❌ Get households error:', error);
    res.status(500).json({
      error: 'Failed to fetch households',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get specific household by ID (public access)
export const getHousehold = async (req: Request, res: Response): Promise<void> => {
  try {
    const { household_id } = req.params;

    const household = await prisma.households.findUnique({
      where: { household_id },
      include: {
        members: {
          where: { is_deleted: false },
        },
        migrant_workers: true,
        land_assets: true,
        govt_scheme_houses: true,
        housing_details: true,
        electrical_facilities: true,
        sanitation_facilities: true,
        water_sources: true,
        waste_management: true,
        health_conditions: true,
        education_details: true,
        employment_details: true,
        entitlements: true,
        nutrition_access: true,
        transportation: true,
        shg_participation: true,
        loans_debts: true,
        balasabha_participation: true,
        child_groups: true,
        agricultural_land: true,
        cultivation_mode: true,
        traditional_farming: true,
        livestock_details: true,
        food_consumption: true,
        cash_crops: true,
        forest_resources: true,
        social_issues: true,
        wage_employment: true,
        livelihood_opportunities: true,
        arts_sports: true,
        public_institutions: true,
        phone_connectivity: true,
        additional_info: true,
        hamlets: true,
      },
    });

    if (!household) {
      res.status(404).json({ error: 'Household not found' });
      return;
    }

    res.json({
      success: true,
      household,
    });
  } catch (error) {
    console.error('❌ Get household error:', error);
    res.status(500).json({
      error: 'Failed to fetch household',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create new household (public, no authentication required)
export const createHousehold = async (req: Request, res: Response): Promise<void> => {
  try {
    let householdData = req.body;

    // --- Robust Data Transformation ---
    // Helper to coerce Yes/No to boolean
    const toBool = (v: any) => v === true || v === 'Yes' || v === 'yes' || v === 1;
    // Helper to map member fields
    const mapMember = (m: any) => ({
      name: m.name,
      relation_to_head: m.relation_to_head || m.relationship || '',
      gender: m.gender,
      age: m.age || 0,
      general_education_level: m.general_education_level || m.education_level || '',
      vocational_knowledge: m.vocational_knowledge || '',
      occupation_sector: m.occupation_sector || '',
      marital_status: m.marital_status || '',
      bank_account: typeof m.bank_account === 'boolean' ? m.bank_account : toBool(m.bank_account),
      has_aadhaar:
        typeof m.has_aadhaar === 'boolean'
          ? m.has_aadhaar
          : toBool(m.has_aadhaar || m.aadhaar_number),
      pension: m.pension || '',
      additional_details: m.additional_details || '',
      date_of_birth: m.date_of_birth || new Date().toISOString(),
    });
    // Helper to map sanitation fields
    const mapSanitation = (s: any) => ({
      has_toilet: toBool(s.has_toilet),
      has_bathroom: toBool(s.has_bathroom),
      all_use_toilet: toBool(s.all_use_toilet || s.all_members_use_toilet),
      uses_public_toilet: toBool(s.uses_public_toilet || s.using_public_toilet),
      satisfied_with_public: toBool(s.satisfied_with_public),
      public_toilet_quality: s.public_toilet_quality || '',
      distance_to_water: s.distance_to_water || 0,
      toilet_tank_type: s.toilet_tank_type || '',
      toilet_closet_type: s.toilet_closet_type || '',
      toilet_roof_material: s.toilet_roof_material || '',
      toilet_wall_type: s.toilet_wall_type || '',
      toilet_door_type: s.toilet_door_type || '',
      toilet_floor_type: s.toilet_floor_type || '',
      water_availability: s.water_availability || '',
      additional_notes: s.additional_notes || '',
      estimated_budget: s.estimated_budget || 0,
    });
    // Add similar mapping for other nested relations as needed...

    // Transform members
    if (Array.isArray(householdData.members)) {
      householdData.members = householdData.members.map(mapMember);
    }
    // Transform sanitation_facilities
    if (Array.isArray(householdData.sanitation_facilities)) {
      householdData.sanitation_facilities = householdData.sanitation_facilities.map(mapSanitation);
    }
    // TODO: Add similar mapping for other nested relations if needed

    // Validate required fields
    if (!householdData.household_head_name || !householdData.hamlet_id) {
      res.status(400).json({
        error: 'Missing required fields',
        required: ['household_head_name', 'hamlet_id'],
      });
      return;
    }

    // Resolve enumerator_id - if it's 'system@thunai.com', find the actual system user
    let enumerator_id = householdData.enumerator_id;
    if (enumerator_id === 'system@thunai.com') {
      const systemUser = await prisma.users.findFirst({
        where: { phone_number: 'system@thunai.com' },
      });
      if (systemUser) {
        enumerator_id = systemUser.user_id;
      } else {
        // Fallback to admin user if system user doesn't exist
        const adminUser = await prisma.users.findFirst({
          where: { phone_number: 'admin@thunai.com' },
        });
        if (adminUser) {
          enumerator_id = adminUser.user_id;
        } else {
          res.status(500).json({
            error: 'No valid enumerator found',
            details: 'System user and admin user not found in database',
          });
          return;
        }
      }
    }

    // Build the data object for Prisma, only including non-empty nested arrays
    const data: any = {
      ...householdData,
      enumerator_id,
      survey_date: new Date(householdData.survey_date || new Date()),
      created_at: new Date(),
      updated_at: new Date(),
    };

    // List of nested relations
    const nestedRelations = [
      'members',
      'migrant_workers',
      'land_assets',
      'govt_scheme_houses',
      'housing_details',
      'electrical_facilities',
      'sanitation_facilities',
      'water_sources',
      'waste_management',
      'health_conditions',
      'education_details',
      'employment_details',
      'entitlements',
      'nutrition_access',
      'transportation',
      'shg_participation',
      'loans_debts',
      'balasabha_participation',
      'child_groups',
      'agricultural_land',
      'cultivation_mode',
      'traditional_farming',
      'livestock_details',
      'food_consumption',
      'cash_crops',
      'forest_resources',
      'social_issues',
      'wage_employment',
      'livelihood_opportunities',
      'arts_sports',
      'public_institutions',
      'phone_connectivity',
      'additional_info',
    ];

    for (const rel of nestedRelations) {
      if (Array.isArray(householdData[rel]) && householdData[rel].length > 0) {
        data[rel] = { create: householdData[rel] };
      } else {
        delete data[rel];
      }
    }

    const household = await prisma.households.create({
      data,
      include: {
        members: true,
        hamlets: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Household created successfully',
      household,
    });
  } catch (error) {
    console.error('❌ Create household error:', error);
    res.status(500).json({
      error: 'Failed to create household',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update household (authenticated access)
export const updateHousehold = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { household_id } = req.params;
    const updateData = req.body;

    // Check if household exists
    const existingHousehold = await prisma.households.findUnique({
      where: { household_id },
    });

    if (!existingHousehold) {
      res.status(404).json({ error: 'Household not found' });
      return;
    }

    // Update household
    const updatedHousehold = await prisma.households.update({
      where: { household_id },
      data: {
        ...updateData,
        updated_at: new Date(),
      },
      include: {
        members: true,
        hamlets: true,
      },
    });

    res.json({
      success: true,
      message: 'Household updated successfully',
      household: updatedHousehold,
    });
  } catch (error) {
    console.error('❌ Update household error:', error);
    res.status(500).json({
      error: 'Failed to update household',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete household (soft delete) (authenticated access)
export const deleteHousehold = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { household_id } = req.params;

    // Check if household exists
    const existingHousehold = await prisma.households.findUnique({
      where: { household_id },
    });

    if (!existingHousehold) {
      res.status(404).json({ error: 'Household not found' });
      return;
    }

    // Soft delete household
    await prisma.households.update({
      where: { household_id },
      data: {
        is_deleted: true,
        updated_at: new Date(),
      },
    });

    res.json({
      success: true,
      message: 'Household deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete household error:', error);
    res.status(500).json({
      error: 'Failed to delete household',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Debug household data transformation
export const debugHouseholdData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const householdData = req.body;

    res.json({
      success: true,
      message: 'Data transformation debug',
      originalData: householdData,
      transformedData: {
        ...householdData,
        survey_date: new Date(householdData.survey_date || new Date()),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  } catch (error) {
    console.error('❌ Debug household data error:', error);
    res.status(500).json({
      error: 'Failed to debug household data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Get total households
    const totalHouseholds = await prisma.households.count({
      where: { is_deleted: false },
    });

    // Get total members
    const totalMembers = await prisma.members.count({
      where: { is_deleted: false },
    });

    // Get completed surveys (households with survey_date)
    const completedSurveys = await prisma.households.count({
      where: {
        is_deleted: false,
        survey_date: { not: null },
      },
    });

    // Get pending surveys (households without survey_date)
    const pendingSurveys = await prisma.households.count({
      where: {
        is_deleted: false,
        survey_date: null,
      },
    });

    // Get unique hamlets covered
    const hamletsCovered = await prisma.households.groupBy({
      by: ['hamlet_id'],
      where: { is_deleted: false },
    });

    // Get unique panchayats covered
    const panchayatsCovered = await prisma.households.groupBy({
      by: ['grama_panchayat'],
      where: { is_deleted: false },
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentActivity = await prisma.households.count({
      where: {
        is_deleted: false,
        created_at: { gte: sevenDaysAgo },
      },
    });

    // Get category distribution
    const categoryDistribution = await prisma.households.groupBy({
      by: ['category'],
      where: { is_deleted: false },
      _count: { category: true },
    });

    res.json({
      success: true,
      totalHouseholds,
      totalMembers,
      completedSurveys,
      pendingSurveys,
      hamletsCovered: hamletsCovered.length,
      panchayatsCovered: panchayatsCovered.length,
      recentActivity,
      categoryDistribution: categoryDistribution.map((cat) => ({
        category: cat.category || 'Unknown',
        count: cat._count.category,
      })),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Get dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard statistics',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
