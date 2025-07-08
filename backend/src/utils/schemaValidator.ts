import { z } from 'zod';

// SRS Section 1: Basic Household Information - EXACT MATCH
export const householdSchema = z.object({
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
  survey_date: z.string().transform(str => new Date(str)),
  enumerator_id: z.string().uuid(),
  local_id: z.string().max(255).optional(),
});

// SRS Section 2: Family Member Details - EXACT MATCH
export const memberSchema = z.object({
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

// SRS Section 3: Migrant Worker Details - EXACT MATCH
export const migrantWorkerSchema = z.object({
  name: z.string().max(150),
  place: z.string().max(100).optional(),
  work_sector: z.string().max(100).optional(),
  skills_expertise: z.string().optional(),
  employment_duration: z.number().optional(),
  additional_details: z.string().optional(),
});

// SRS Section 4: Land Assets - EXACT MATCH
export const landAssetSchema = z.object({
  land_type: z.string().max(100).optional(),
  ownership_type: z.string().max(100).optional(),
  area_in_acres: z.number().optional(),
  documentation_type: z.string().max(100).optional(),
});

// SRS Section 5: Housing Details - EXACT MATCH
export const housingDetailSchema = z.object({
  completion_status: z.string().max(50).optional(),
  age_of_house: z.number().optional(),
  current_condition: z.string().max(50).optional(),
  roof_material: z.string().max(100).optional(),
  roof_condition: z.string().max(50).optional(),
  roof_budget: z.number().optional(),
  wall_material: z.string().max(100).optional(),
  wall_condition: z.string().max(50).optional(),
  wall_budget: z.number().optional(),
  floor_material: z.string().max(100).optional(),
  floor_needs_repair: z.boolean().optional(),
  floor_budget: z.number().optional(),
  door_condition: z.string().max(50).optional(),
  good_doors_count: z.number().optional(),
  window_condition: z.string().max(50).optional(),
  good_windows_count: z.number().optional(),
  door_window_budget: z.number().optional(),
  kitchen_ventilation: z.string().max(50).optional(),
  kitchen_appliances: z.string().optional(), // JSON array as text
  kitchen_budget: z.number().optional(),
});

// SRS Section 6: Electrical Facilities - EXACT MATCH
export const electricalFacilitySchema = z.object({
  is_electrified: z.boolean().optional(),
  has_connection: z.boolean().optional(),
  wiring_complete: z.string().max(50).optional(),
  wiring_safe: z.string().max(50).optional(),
  cooking_fuel: z.string().max(50).optional(),
  stove_type: z.string().max(50).optional(),
  bulbs_count: z.number().optional(),
  bulb_types: z.string().optional(), // JSON array as text
  has_solar: z.boolean().optional(),
  solar_usage: z.string().optional(),
  solar_condition: z.string().max(50).optional(),
  additional_comments: z.string().optional(),
  estimated_budget: z.number().optional(),
});

// SRS Section 7: Sanitation Facilities - EXACT MATCH
export const sanitationFacilitySchema = z.object({
  has_toilet: z.boolean().optional(),
  has_bathroom: z.boolean().optional(),
  all_use_toilet: z.boolean().optional(),
  uses_public_toilet: z.boolean().optional(),
  satisfied_with_public: z.boolean().optional(),
  public_toilet_quality: z.string().max(50).optional(),
  distance_to_water: z.number().optional(),
  toilet_tank_type: z.string().max(50).optional(),
  toilet_closet_type: z.string().max(50).optional(),
  toilet_roof_material: z.string().max(50).optional(),
  toilet_wall_type: z.string().max(50).optional(),
  toilet_door_type: z.string().max(50).optional(),
  toilet_floor_type: z.string().max(50).optional(),
  water_availability: z.string().max(50).optional(),
  additional_notes: z.string().optional(),
  estimated_budget: z.number().optional(),
});

// Complete household schema with all SRS sections
export const completeHouseholdSchema = householdSchema.extend({
  members: z.array(memberSchema).optional(),
  migrant_workers: z.array(migrantWorkerSchema).optional(),
  land_assets: z.array(landAssetSchema).optional(),
  housing_details: z.array(housingDetailSchema).optional(),
  electrical_facilities: z.array(electricalFacilitySchema).optional(),
  sanitation_facilities: z.array(sanitationFacilitySchema).optional(),
  // Add other sections as needed...
});

export function validatePwaData(pwaData: any) {
  try {
    const result = completeHouseholdSchema.safeParse(pwaData);
    if (!result.success) {
      console.error('PWA Data Validation Errors:', result.error.flatten());
      return {
        isValid: false,
        errors: result.error.flatten(),
        message: 'PWA data does not match database schema'
      };
    }
    return {
      isValid: true,
      data: result.data,
      message: 'PWA data matches database schema perfectly'
    };
  } catch (error) {
    return {
      isValid: false,
      errors: error,
      message: 'Validation failed with exception'
    };
  }
}

export function comparePwaToDatabase(pwaData: any) {
  const expectedFields = [
    // SRS Section 1: Basic Household Information
    'hamlet_id', 'household_head_name', 'address', 'post_office', 
    'colony_settlement_name', 'category', 'micro_plan_number', 
    'grama_panchayat', 'ward_number', 'house_number', 
    'family_members_count', 'survey_date', 'enumerator_id',
    
    // SRS Section 2: Family Members
    'members',
    
    // SRS Section 3: Migrant Workers
    'migrant_workers',
    
    // SRS Section 4: Land Assets
    'land_assets',
    
    // SRS Section 5: Housing Details
    'housing_details',
    
    // SRS Section 6: Electrical Facilities
    'electrical_facilities',
    
    // SRS Section 7: Sanitation Facilities
    'sanitation_facilities'
  ];

  const missingFields = [];
  const extraFields = [];

  // Check for missing fields
  for (const field of expectedFields) {
    if (!(field in pwaData)) {
      missingFields.push(field);
    }
  }

  // Check for extra fields
  for (const field in pwaData) {
    if (!expectedFields.includes(field)) {
      extraFields.push(field);
    }
  }

  return {
    missingFields,
    extraFields,
    isPerfectMatch: missingFields.length === 0 && extraFields.length === 0,
    message: missingFields.length > 0 
      ? `Missing fields: ${missingFields.join(', ')}`
      : extraFields.length > 0
      ? `Extra fields: ${extraFields.join(', ')}`
      : 'Perfect match with database schema'
  };
} 