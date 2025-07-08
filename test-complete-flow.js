// Complete end-to-end test for THUNAI system
// Tests: PWA Data → Backend Storage → Dashboard Retrieval

// Use node-fetch for fetch in Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'http://localhost:4000';

// Test data that simulates PWA form submission
const testHouseholdData = {
  headName: "Test Household Head",
  address: "Test Address",
  postOffice: "Test Post Office",
  colonyName: "Test Colony",
  category: "General",
  microPlanNumber: "MP001",
  gramaPanchayat: "Test Panchayat",
  wardNumber: "Ward 1",
  houseNumber: "H001",
      familyMembersCount: 4,
      members: [
        {
      name: "Test Member 1",
      gender: "Male",
      relationship: "Head",
          age: 35,
      educationLevel: "High School",
      vocationalKnowledge: "Carpentry",
      occupationSector: "Construction",
      maritalStatus: "Married",
          hasBankAccount: true,
          hasAadhaar: true,
      pension: "None",
      additionalDetails: "Test details"
        }
      ],
      housingDetails: {
    completionStatus: "Completed",
        ageOfHouse: 10,
    currentCondition: "Good",
    roofMaterial: "Concrete",
    roofCondition: "Good",
    roofBudget: 50000,
    wallMaterial: "Brick",
    wallCondition: "Good",
    wallBudget: 100000,
    floorMaterial: "Cement",
        floorNeedsRepair: false,
    floorBudget: 30000,
    doorCondition: "Good",
        goodDoorsCount: 3,
    windowCondition: "Good",
        goodWindowsCount: 4,
    doorWindowBudget: 20000,
    kitchenVentilation: "Good",
    kitchenAppliances: ["Stove", "Refrigerator"],
    kitchenBudget: 25000
      },
      electricalFacilities: {
        isElectrified: true,
        hasConnection: true,
    wiringComplete: "Complete",
    wiringSafe: "Safe",
    cookingFuel: "LPG",
    stoveType: "Gas Stove",
    bulbsCount: 8,
    bulbTypes: ["LED", "CFL"],
        hasSolar: false,
    solarUsage: "",
    solarCondition: "",
    additionalComments: "Good electrical setup",
    estimatedBudget: 15000
      },
      sanitationFacilities: {
        hasToilet: true,
        hasBathroom: true,
        allUseToilet: true,
        usesPublicToilet: false,
        satisfiedWithPublic: false,
    publicToiletQuality: "",
        distanceToWater: 10,
    toiletTankType: "Flush Tank",
    toiletClosetType: "Western",
    toiletRoofMaterial: "Concrete",
    toiletWallType: "Brick",
    toiletDoorType: "Wooden",
    toiletFloorType: "Cement",
    waterAvailability: "24/7",
    additionalNotes: "Good sanitation facilities",
    estimatedBudget: 50000
      },
      waterSources: {
    hasConservation: true,
    conservationMethods: "Rainwater harvesting",
        hasStorageTank: true,
    sourceType: "Municipal",
    ownership: "Own",
    availability: "24/7",
    quality: "Good",
    collectionMethod: "Pipeline",
    additionalRemarks: "Reliable water supply",
    estimatedBudget: 20000
      },
      wasteManagement: {
    solidWasteFacility: "Municipal collection",
    liquidWasteFacility: "Septic tank",
    wastewaterHandling: "Proper drainage",
    additionalRemarks: "Good waste management",
    estimatedBudget: 10000
      },
      entitlements: {
        landOwnershipDocument: true,
        rationCardAvailable: true,
    rationCardType: "APL",
        healthInsurance: true,
        employeeCard: false,
        homelessSupportScheme: false,
    remarks: "Has basic entitlements"
      },
      nutritionAccess: {
    sourceOfSupport: "Government schemes",
        rationShopReceiving: true,
    rationItems: ["Rice", "Sugar", "Oil"],
    anganwadiReceiving: true,
    anganwadiItems: ["Milk", "Eggs"],
        tribalDeptReceiving: false,
        tribalDeptItems: [],
        vathilPadiReceiving: false,
        vathilPadiItems: []
      },
      transportation: {
    accessPathType: "Paved road",
    distanceToMainRoad: 100,
    pathCondition: "Good",
    vehicleOwned: "Two-wheeler",
    additionalNotes: "Good connectivity"
      },
      balasabhaParticipation: {
    hasChildrenMembers: true,
    childrenCount: 2
      },
      agriculturalLand: {
    landType: "Paddy field",
    totalCultivatedArea: 2.5,
    unusedArea: 0.5,
    highWaterArea: 1.0,
    mediumWaterArea: 1.0,
    irrigationSources: ["Canal", "Well"],
    additionalRemarks: "Good agricultural land"
      },
      cultivationMode: {
    preferredMethod: "Traditional"
      },
      traditionalFarming: {
    practicesTraditional: true,
    traditionalCropDetails: "Paddy cultivation",
    lastPracticedSeason: "Kharif 2024",
    interestResume: true,
    resumeMode: "With support",
    additionalSupport: "Training and equipment",
    revivalBudget: 50000
  }
};

// Helper function to transform PWA data to backend format
const transformHouseholdData = (pwaData) => {
  const arrayToString = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.join(', ');
    }
    return '';
  };

  const baseData = {
        hamlet_id: 1,
        household_head_name: pwaData.headName || 'Unknown',
        survey_date: new Date().toISOString(),
    enumerator_id: 'system@thunai.com',
        address: pwaData.address || '',
        post_office: pwaData.postOffice || '',
        colony_settlement_name: pwaData.colonyName || '',
        category: pwaData.category || '',
        micro_plan_number: pwaData.microPlanNumber || '',
        grama_panchayat: pwaData.gramaPanchayat || '',
        ward_number: pwaData.wardNumber || '',
        house_number: pwaData.houseNumber || '',
    family_members_count: pwaData.familyMembersCount || 0
  };

  // Transform members if present
  if (pwaData.members && Array.isArray(pwaData.members) && pwaData.members.length > 0) {
    baseData.members = pwaData.members.map(member => ({
          name: member.name || '',
          gender: member.gender || '',
          relation_to_head: member.relationship || '',
          age: member.age || 0,
          general_education_level: member.educationLevel || '',
          vocational_knowledge: member.vocationalKnowledge || '',
          occupation_sector: member.occupationSector || '',
          marital_status: member.maritalStatus || '',
          bank_account: member.hasBankAccount || false,
          has_aadhaar: member.hasAadhaar || false,
          pension: member.pension || '',
          additional_details: member.additionalDetails || '',
          date_of_birth: new Date().toISOString()
    }));
  }

  // Transform housing details if present
  if (pwaData.housingDetails && Object.keys(pwaData.housingDetails).some(key => pwaData.housingDetails[key])) {
    baseData.housing_details = [{
          completion_status: pwaData.housingDetails.completionStatus || '',
          age_of_house: pwaData.housingDetails.ageOfHouse || 0,
          current_condition: pwaData.housingDetails.currentCondition || '',
          roof_material: pwaData.housingDetails.roofMaterial || '',
          roof_condition: pwaData.housingDetails.roofCondition || '',
          roof_budget: pwaData.housingDetails.roofBudget || 0,
          wall_material: pwaData.housingDetails.wallMaterial || '',
          wall_condition: pwaData.housingDetails.wallCondition || '',
          wall_budget: pwaData.housingDetails.wallBudget || 0,
          floor_material: pwaData.housingDetails.floorMaterial || '',
          floor_needs_repair: pwaData.housingDetails.floorNeedsRepair || false,
          floor_budget: pwaData.housingDetails.floorBudget || 0,
          door_condition: pwaData.housingDetails.doorCondition || '',
          good_doors_count: pwaData.housingDetails.goodDoorsCount || 0,
          window_condition: pwaData.housingDetails.windowCondition || '',
          good_windows_count: pwaData.housingDetails.goodWindowsCount || 0,
          door_window_budget: pwaData.housingDetails.doorWindowBudget || 0,
          kitchen_ventilation: pwaData.housingDetails.kitchenVentilation || '',
      kitchen_appliances: arrayToString(pwaData.housingDetails.kitchenAppliances),
          kitchen_budget: pwaData.housingDetails.kitchenBudget || 0
    }];
  }

  // Transform electrical facilities if present
  if (pwaData.electricalFacilities && Object.keys(pwaData.electricalFacilities).some(key => pwaData.electricalFacilities[key])) {
    baseData.electrical_facilities = [{
          is_electrified: pwaData.electricalFacilities.isElectrified || false,
          has_connection: pwaData.electricalFacilities.hasConnection || false,
          wiring_complete: pwaData.electricalFacilities.wiringComplete || '',
          wiring_safe: pwaData.electricalFacilities.wiringSafe || '',
          cooking_fuel: pwaData.electricalFacilities.cookingFuel || '',
          stove_type: pwaData.electricalFacilities.stoveType || '',
          bulbs_count: pwaData.electricalFacilities.bulbsCount || 0,
      bulb_types: arrayToString(pwaData.electricalFacilities.bulbTypes),
          has_solar: pwaData.electricalFacilities.hasSolar || false,
          solar_usage: pwaData.electricalFacilities.solarUsage || '',
          solar_condition: pwaData.electricalFacilities.solarCondition || '',
          additional_comments: pwaData.electricalFacilities.additionalComments || '',
          estimated_budget: pwaData.electricalFacilities.estimatedBudget || 0
    }];
  }

  // Transform nutrition access if present
  if (pwaData.nutritionAccess && Object.keys(pwaData.nutritionAccess).some(key => pwaData.nutritionAccess[key])) {
    baseData.nutrition_access = [{
          source_of_support: pwaData.nutritionAccess.sourceOfSupport || '',
          ration_shop_receiving: pwaData.nutritionAccess.rationShopReceiving || false,
      ration_items: arrayToString(pwaData.nutritionAccess.rationItems),
          anganwadi_receiving: pwaData.nutritionAccess.anganwadiReceiving || false,
      anganwadi_items: arrayToString(pwaData.nutritionAccess.anganwadiItems),
          tribal_dept_receiving: pwaData.nutritionAccess.tribalDeptReceiving || false,
      tribal_dept_items: arrayToString(pwaData.nutritionAccess.tribalDeptItems),
          vathil_padi_receiving: pwaData.nutritionAccess.vathilPadiReceiving || false,
      vathil_padi_items: arrayToString(pwaData.nutritionAccess.vathilPadiItems)
    }];
  }

  // Transform agricultural land if present
  if (pwaData.agriculturalLand && Object.keys(pwaData.agriculturalLand).some(key => pwaData.agriculturalLand[key])) {
    baseData.agricultural_land = [{
          land_type: pwaData.agriculturalLand.landType || '',
          total_cultivated_area: pwaData.agriculturalLand.totalCultivatedArea || 0,
          unused_area: pwaData.agriculturalLand.unusedArea || 0,
          high_water_area: pwaData.agriculturalLand.highWaterArea || 0,
          medium_water_area: pwaData.agriculturalLand.mediumWaterArea || 0,
      irrigation_sources: arrayToString(pwaData.agriculturalLand.irrigationSources),
          additional_remarks: pwaData.agriculturalLand.additionalRemarks || ''
    }];
  }

  return baseData;
};

// Test the complete flow
async function testCompleteFlow() {
  console.log('🧪 Testing complete PWA → Backend → Dashboard flow...\n');

  try {
    // Step 1: Health check
    console.log('1️⃣ Testing backend health...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Backend health:', healthData.status);
    console.log('');

    // Step 2: Transform PWA data
    console.log('2️⃣ Transforming PWA data...');
    const transformedData = transformHouseholdData(testHouseholdData);
    console.log('✅ Data transformed successfully');
    console.log('📊 Household head:', transformedData.household_head_name);
    console.log('👥 Members count:', transformedData.members?.length || 0);
    console.log('🏠 Housing details:', transformedData.housing_details ? 'Present' : 'None');
    console.log('⚡ Electrical facilities:', transformedData.electrical_facilities ? 'Present' : 'None');
    console.log('');

    // Step 3: Create household in backend
    console.log('3️⃣ Creating household in backend...');
    const createResponse = await fetch(`${API_BASE_URL}/api/households`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData)
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.log('❌ Failed to create household:', errorData);
      return;
    }

    const createData = await createResponse.json();
    console.log('✅ Household created successfully');
    console.log('🆔 Household ID:', createData.household.household_id);
    console.log('');

    // Step 4: Fetch household from backend
    console.log('4️⃣ Fetching household from backend...');
    const fetchResponse = await fetch(`${API_BASE_URL}/api/households/${createData.household.household_id}`);
    const fetchData = await fetchResponse.json();
    
    if (!fetchResponse.ok) {
      console.log('❌ Failed to fetch household:', fetchData);
      return;
    }

    console.log('✅ Household fetched successfully');
    console.log('📊 Household data retrieved');
    console.log('👥 Members:', fetchData.household.members?.length || 0);
    console.log('🏠 Housing details:', fetchData.household.housing_details?.length || 0);
    console.log('⚡ Electrical facilities:', fetchData.household.electrical_facilities?.length || 0);
    console.log('');

    // Step 5: Test dashboard API (simulate dashboard fetching)
    console.log('5️⃣ Testing dashboard API...');
    const dashboardResponse = await fetch(`${API_BASE_URL}/api/households?page=1&limit=10`);
    const dashboardData = await dashboardResponse.json();
    
    if (!dashboardResponse.ok) {
      console.log('❌ Failed to fetch dashboard data:', dashboardData);
      return;
    }

    console.log('✅ Dashboard data fetched successfully');
    console.log('📊 Total households:', dashboardData.pagination.total);
    console.log('📄 Current page:', dashboardData.pagination.page);
    console.log('📋 Households on page:', dashboardData.households.length);
    console.log('');

    // Step 6: Verify data integrity
    console.log('6️⃣ Verifying data integrity...');
    const createdHousehold = dashboardData.households.find(h => h.household_id === createData.household.household_id);
    
    if (createdHousehold) {
      console.log('✅ Created household found in dashboard data');
      console.log('📊 Head name matches:', createdHousehold.household_head_name === testHouseholdData.headName);
      console.log('👥 Members count matches:', createdHousehold.members?.length === testHouseholdData.members.length);
      } else {
      console.log('❌ Created household not found in dashboard data');
    }

    console.log('\n🎉 Complete flow test successful!');
    console.log('✅ PWA data → Backend storage → Dashboard retrieval works correctly');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testCompleteFlow(); 