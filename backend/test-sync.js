// Test script to verify PWA to Backend sync
const fetch = require('node-fetch');

// Sample PWA data (exactly what the PWA sends)
const samplePwaData = {
  headName: 'John Doe',
  address: '123 Main Street, Attappady',
  postOffice: 'Agali',
  colonyName: 'Tribal Colony',
  category: 'ST',
  microPlanNumber: 'MP001',
  gramaPanchayat: 'Agali',
  wardNumber: '1',
  houseNumber: 'H001',
  familyMembersCount: 4,
  members: [
    {
      name: 'John Doe',
      relationship: 'Head',
      gender: 'Male',
      age: 45,
      educationLevel: 'Secondary',
      vocationalKnowledge: 'Farming',
      occupationSector: 'Agriculture',
      maritalStatus: 'Married',
      hasBankAccount: true,
      hasAadhaar: true,
      pension: '',
      additionalDetails: '',
    },
  ],
  migrantWorkers: [],
  landAssets: [],
  housingDetails: {
    completionStatus: 'Completed',
    ageOfHouse: 10,
    currentCondition: 'Good',
    roofMaterial: 'Concrete',
    roofCondition: 'Good',
    roofBudget: 0,
    wallMaterial: 'Cement Blocks',
    wallCondition: 'Good',
    wallBudget: 0,
    floorMaterial: 'Cement',
    floorNeedsRepair: false,
    floorBudget: 0,
    doorCondition: 'Good',
    goodDoorsCount: 3,
    windowCondition: 'Good',
    goodWindowsCount: 4,
    doorWindowBudget: 0,
    kitchenVentilation: 'Good',
    kitchenAppliances: ['Mixer'],
    kitchenBudget: 0,
  },
  electricalFacilities: {
    isElectrified: true,
    hasConnection: true,
    wiringComplete: 'Fully Wired',
    wiringSafe: 'Safe',
    cookingFuel: 'LPG',
    stoveType: 'Double Burner',
    bulbsCount: 5,
    bulbTypes: ['LED'],
    hasSolar: false,
    solarUsage: '',
    solarCondition: '',
    additionalComments: '',
    estimatedBudget: 0,
  },
  sanitationFacilities: {
    hasToilet: true,
    hasBathroom: true,
    allUseToilet: true,
    usesPublicToilet: false,
    satisfiedWithPublic: false,
    publicToiletQuality: '',
    distanceToWater: 10,
    toiletTankType: 'Septic Tank',
    toiletClosetType: 'Indian',
    toiletRoofMaterial: 'Concrete',
    toiletWallType: 'Tile',
    toiletDoorType: 'Wooden',
    toiletFloorType: 'Tile',
    waterAvailability: 'Inside',
    additionalNotes: '',
    estimatedBudget: 0,
  },
};

// Transform PWA data to backend format (same as in api.ts)
function transformHouseholdData(pwaData) {
  return {
    hamlet_id: 1,
    household_head_name: pwaData.headName || 'Unknown',
    survey_date: new Date().toISOString(),
    enumerator_id: '00000000-0000-0000-0000-000000000000',
    address: pwaData.address,
    post_office: pwaData.postOffice,
    colony_settlement_name: pwaData.colonyName,
    category: pwaData.category,
    micro_plan_number: pwaData.microPlanNumber,
    grama_panchayat: pwaData.gramaPanchayat,
    ward_number: pwaData.wardNumber,
    house_number: pwaData.houseNumber,
    family_members_count: pwaData.familyMembersCount,
    members:
      pwaData.members?.map((member) => ({
        name: member.name,
        gender: member.gender,
        relation_to_head: member.relationship,
        age: member.age,
        general_education_level: member.educationLevel,
        vocational_knowledge: member.vocationalKnowledge,
        occupation_sector: member.occupationSector,
        marital_status: member.maritalStatus,
        bank_account: member.hasBankAccount,
        has_aadhaar: member.hasAadhaar,
        pension: member.pension,
        additional_details: member.additionalDetails,
        date_of_birth: new Date().toISOString(),
      })) || [],
    migrant_workers:
      pwaData.migrantWorkers?.map((worker) => ({
        name: worker.name,
        place: worker.place,
        work_sector: worker.workSector,
        skills_expertise: worker.skillsExpertise,
        employment_duration: worker.employmentDuration,
        additional_details: worker.additionalDetails,
      })) || [],
    land_assets:
      pwaData.landAssets?.map((asset) => ({
        land_type: asset.landType,
        ownership_type: asset.ownershipType,
        area_in_acres: asset.areaInAcres,
        documentation_type: asset.documentationType,
      })) || [],
    housing_details: pwaData.housingDetails
      ? [
          {
            completion_status: pwaData.housingDetails.completionStatus,
            age_of_house: pwaData.housingDetails.ageOfHouse,
            current_condition: pwaData.housingDetails.currentCondition,
            roof_material: pwaData.housingDetails.roofMaterial,
            roof_condition: pwaData.housingDetails.roofCondition,
            roof_budget: pwaData.housingDetails.roofBudget,
            wall_material: pwaData.housingDetails.wallMaterial,
            wall_condition: pwaData.housingDetails.wallCondition,
            wall_budget: pwaData.housingDetails.wallBudget,
            floor_material: pwaData.housingDetails.floorMaterial,
            floor_needs_repair: pwaData.housingDetails.floorNeedsRepair,
            floor_budget: pwaData.housingDetails.floorBudget,
            door_condition: pwaData.housingDetails.doorCondition,
            good_doors_count: pwaData.housingDetails.goodDoorsCount,
            window_condition: pwaData.housingDetails.windowCondition,
            good_windows_count: pwaData.housingDetails.goodWindowsCount,
            door_window_budget: pwaData.housingDetails.doorWindowBudget,
            kitchen_ventilation: pwaData.housingDetails.kitchenVentilation,
            kitchen_appliances: JSON.stringify(pwaData.housingDetails.kitchenAppliances),
            kitchen_budget: pwaData.housingDetails.kitchenBudget,
          },
        ]
      : [],
    electrical_facilities: pwaData.electricalFacilities
      ? [
          {
            is_electrified: pwaData.electricalFacilities.isElectrified,
            has_connection: pwaData.electricalFacilities.hasConnection,
            wiring_complete: pwaData.electricalFacilities.wiringComplete,
            wiring_safe: pwaData.electricalFacilities.wiringSafe,
            cooking_fuel: pwaData.electricalFacilities.cookingFuel,
            stove_type: pwaData.electricalFacilities.stoveType,
            bulbs_count: pwaData.electricalFacilities.bulbsCount,
            bulb_types: JSON.stringify(pwaData.electricalFacilities.bulbTypes),
            has_solar: pwaData.electricalFacilities.hasSolar,
            solar_usage: pwaData.electricalFacilities.solarUsage,
            solar_condition: pwaData.electricalFacilities.solarCondition,
            additional_comments: pwaData.electricalFacilities.additionalComments,
            estimated_budget: pwaData.electricalFacilities.estimatedBudget,
          },
        ]
      : [],
    sanitation_facilities: pwaData.sanitationFacilities
      ? [
          {
            has_toilet: pwaData.sanitationFacilities.hasToilet,
            has_bathroom: pwaData.sanitationFacilities.hasBathroom,
            all_use_toilet: pwaData.sanitationFacilities.allUseToilet,
            uses_public_toilet: pwaData.sanitationFacilities.usesPublicToilet,
            satisfied_with_public: pwaData.sanitationFacilities.satisfiedWithPublic,
            public_toilet_quality: pwaData.sanitationFacilities.publicToiletQuality,
            distance_to_water: pwaData.sanitationFacilities.distanceToWater,
            toilet_tank_type: pwaData.sanitationFacilities.toiletTankType,
            toilet_closet_type: pwaData.sanitationFacilities.toiletClosetType,
            toilet_roof_material: pwaData.sanitationFacilities.toiletRoofMaterial,
            toilet_wall_type: pwaData.sanitationFacilities.toiletWallType,
            toilet_door_type: pwaData.sanitationFacilities.toiletDoorType,
            toilet_floor_type: pwaData.sanitationFacilities.toiletFloorType,
            water_availability: pwaData.sanitationFacilities.waterAvailability,
            additional_notes: pwaData.sanitationFacilities.additionalNotes,
            estimated_budget: pwaData.sanitationFacilities.estimatedBudget,
          },
        ]
      : [],
  };
}

async function testSync() {
  try {
    console.log('=== TESTING PWA TO BACKEND SYNC ===');

    // First, test the debug endpoint
    console.log('\n1. Testing debug endpoint...');
    const debugResponse = await fetch('http://localhost:4000/api/households/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token',
      },
      body: JSON.stringify(transformHouseholdData(samplePwaData)),
    });

    const debugResult = await debugResponse.json();
    console.log('Debug endpoint result:', JSON.stringify(debugResult, null, 2));

    if (debugResult.success) {
      console.log('✅ Data validation PASSED');

      // Now test the actual create endpoint
      console.log('\n2. Testing actual household creation...');
      const createResponse = await fetch('http://localhost:4000/api/households', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify(transformHouseholdData(samplePwaData)),
      });

      const createResult = await createResponse.json();
      console.log('Create endpoint result:', JSON.stringify(createResult, null, 2));

      if (createResponse.ok) {
        console.log('✅ Household created successfully!');
        console.log('✅ PWA to Backend sync is working perfectly!');
      } else {
        console.log('❌ Household creation failed');
      }
    } else {
      console.log('❌ Data validation failed');
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testSync();
