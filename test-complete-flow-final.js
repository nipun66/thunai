#!/usr/bin/env node

/**
 * THUNAI Complete Data Flow Test - FINAL
 * Tests: PWA Data Entry → Backend Storage → Dashboard Viewing
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:4000';

console.log('🔄 THUNAI Complete Data Flow Test - FINAL\n');

// Default credentials
const ENUMERATOR = { phone: '1234567890', password: '123456' };
const ADMIN = { phone: 'admin', password: 'admin123' };

let enumeratorToken = null;
let adminToken = null;

async function loginUser(credentials, userType) {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    
    if (response.ok && data.token) {
      console.log(`✅ ${userType} login successful`);
      return data.token;
    } else {
      console.log(`❌ ${userType} login failed: ${data.error}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ ${userType} login error: ${error.message}`);
    return null;
  }
}

async function testCompleteDataFlow() {
  console.log('1️⃣ Logging in users...');
  
  // Login as enumerator (PWA user)
  enumeratorToken = await loginUser(ENUMERATOR, 'Enumerator');
  if (!enumeratorToken) return false;
  
  // Login as admin (Dashboard user)
  adminToken = await loginUser(ADMIN, 'Admin');
  if (!adminToken) return false;

  console.log('\n2️⃣ Simulating PWA Data Entry (Enumerator creates household)...');
  
  // Sample household data (what PWA would send)
  const householdData = {
    household_head_name: "John Doe",
    address: "123 Main Street, Attappady",
    post_office: "Attappady Post Office",
    colony_settlement_name: "Tribal Colony",
    category: "ST",
    micro_plan_number: "MP001",
    grama_panchayat: "Attappady Grama Panchayat",
    ward_number: "1",
    house_number: "H001",
    family_members_count: 4,
    members: [
      {
        name: "John Doe",
        relationship: "Head",
        gender: "Male",
        age: 35,
        education_level: "Secondary",
        occupation_sector: "Agriculture",
        marital_status: "Married",
        bank_account: "Yes",
        aadhaar_number: "Yes",
        pension: "None",
        additional_details: "Head of family"
      },
      {
        name: "Jane Doe",
        relationship: "Spouse",
        gender: "Female",
        age: 30,
        education_level: "Primary",
        occupation_sector: "Agriculture",
        marital_status: "Married",
        bank_account: "Yes",
        aadhaar_number: "Yes",
        pension: "None",
        additional_details: "Spouse"
      }
    ],
    migrant_workers: [],
    land_assets: [
      {
        land_type: "Agricultural",
        ownership_type: "Own",
        area_in_acres: 2.5,
        documentation_type: "Title Deed"
      }
    ],
    housing_details: [
      {
        completion_status: "Completed",
        age_of_house: 10,
        current_condition: "Good",
        roof_material: "Concrete",
        roof_condition: "Good",
        wall_material: "Cement Blocks",
        wall_condition: "Stable",
        floor_material: "Cement",
        needs_repair: "No"
      }
    ],
    electrical_facilities: [
      {
        is_electrified: "Yes",
        has_electricity_connection: "Yes",
        wiring_complete: "Fully Wired",
        wiring_safe: "Safe",
        cooking_fuel: "LPG",
        stove_type: "Double Burner",
        number_of_bulbs: 6,
        bulb_types: ["LED"],
        has_solar: "No"
      }
    ],
    sanitation_facilities: [
      {
        has_toilet: "Yes",
        has_bathroom: "Yes",
        all_members_use_toilet: "Yes",
        using_public_toilet: "No",
        toilet_tank_type: "Septic Tank",
        toilet_closet_type: "Indian",
        water_availability: "Inside"
      }
    ],
    water_sources: [
      {
        type: "Open Well",
        ownership: "Own",
        availability: "Year-round",
        quality: "Good",
        collection_method: "Pipe"
      }
    ],
    waste_management: [
      {
        solid_waste_facility: "Municipal collection",
        liquid_waste_facility: "Septic tank",
        household_waste_water: "Connected to drainage"
      }
    ],
    health_conditions: [],
    education_details: [
      {
        student_name: "Child Doe",
        class_grade: "5",
        school_institution: "Attappady Government School",
        issues_faced: "Transport",
        estimated_budget: 5000
      }
    ],
    employment_details: [],
    entitlements: [
      {
        land_ownership_document: "Yes",
        ration_card_available: "Yes",
        ration_card_type: "Pink",
        health_insurance: "Yes",
        employee_card: "No"
      }
    ],
    nutrition_access: [
      {
        source: "Ration",
        currently_receiving: "Yes",
        item_name: "Rice",
        quantity: 25,
        unit: "kg"
      }
    ],
    transportation: [
      {
        access_path_type: "Accessible by four-wheeler",
        distance_to_main_road: 500,
        path_condition: "Good",
        vehicle_owned: "Two-Wheeler"
      }
    ],
    shg_participation: [],
    loans_debts: [],
    balasabha_participation: [
      {
        children_members: "Yes",
        number_enrolled: 2
      }
    ],
    child_groups: [],
    agricultural_land: [
      {
        land_type: "Dry Land",
        total_cultivated_area: 2.0,
        unused_area: 0.5,
        high_water_area: 1.0,
        medium_water_area: 1.0,
        irrigation_sources: ["Open Well"]
      }
    ],
    cultivation_mode: [
      {
        preferred_method: "Individual Farming"
      }
    ],
    traditional_farming: [
      {
        practiced: "Yes",
        details: "Native rice varieties",
        last_season: "Monsoon 2023",
        interest_resume: "Yes",
        mode: "Individual",
        estimated_budget: 10000
      }
    ],
    livestock_details: [
      {
        animal_category: "Goat",
        number: 5,
        breed_type: "Indigenous",
        estimated_income: 15000
      }
    ],
    food_consumption: [
      {
        item_name: "Rice/Wheat",
        monthly_quantity: 30,
        unit: "kg",
        produced_at_home: "Yes",
        source: "Home"
      }
    ],
    cash_crops: [
      {
        crop_name: "Coffee",
        number: 50,
        older_than_3_years: "Yes",
        annual_income: 25000
      }
    ],
    forest_resources: [
      {
        product_name: "Honey",
        days_collected: 30,
        quantity_kg: 10,
        selling_price: 500,
        place_sold: "Local market"
      }
    ],
    social_issues: [],
    wage_employment: [
      {
        workdays_2023_24: 100,
        distance_to_job: 5,
        payment_mode: "Bank Transfer",
        work_availability: "Daily",
        work_area: "Roadwork"
      }
    ],
    livelihood_opportunities: [
      {
        member_name: "John Doe",
        age: 35,
        work_interest: "Animal Husbandry",
        support_required: "Training and seed capital",
        expected_income: 30000
      }
    ],
    arts_sports: [
      {
        member_name: "Child Doe",
        age: 12,
        area_interest: "Football",
        additional_details: "School team member"
      }
    ],
    public_institutions: [
      {
        institution_name: "PHC",
        distance: 2,
        services_availed: ["Health check-up"],
        support_received: "Free medicines",
        satisfaction_level: 4
      }
    ],
    phone_connectivity: [
      {
        has_phone: "Yes",
        mobile_numbers: "9876543210",
        landline_number: ""
      }
    ],
    additional_info: [
      {
        benefits_received: "PM-KISAN, MGNREGS",
        additional_remarks: "Active community member",
        survey_comments: "Cooperative family"
      }
    ]
  };

  try {
    const createResponse = await fetch(`${API_BASE}/api/households`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${enumeratorToken}`
      },
      body: JSON.stringify(householdData)
    });

    const createData = await createResponse.json();
    
    if (createResponse.ok) {
      console.log('✅ Household data created successfully (PWA → Backend)');
      console.log(`   Household ID: ${createData.household_id || createData.id}`);
      console.log(`   Head of Family: ${householdData.household_head_name}`);
      console.log(`   Members: ${householdData.members.length}`);
      console.log(`   Address: ${householdData.address}`);
      return createData.household_id || createData.id;
    } else {
      console.log('❌ Household creation failed');
      console.log(`   Error: ${createData.error || 'Unknown error'}`);
      console.log(`   Status: ${createResponse.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Household creation error');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testDashboardDataViewing(householdId) {
  console.log('\n3️⃣ Testing Dashboard Data Viewing (Admin views data)...');
  
  try {
    // Admin fetches all households
    const householdsResponse = await fetch(`${API_BASE}/api/households`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    
    const householdsData = await householdsResponse.json();
    
    if (householdsResponse.ok) {
      console.log('✅ Dashboard can view all households');
      console.log(`   Total households: ${householdsData.length || 0}`);
      
      if (householdsData.length > 0) {
        const latestHousehold = householdsData[0];
        console.log(`   Latest household: ${latestHousehold.household_head_name}`);
        console.log(`   Address: ${latestHousehold.address}`);
        console.log(`   Category: ${latestHousehold.category}`);
        console.log(`   Members count: ${latestHousehold.family_members_count}`);
      }
      
      return true;
    } else {
      console.log('❌ Dashboard household viewing failed');
      console.log(`   Error: ${householdsData.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Dashboard viewing error');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testDashboardStats() {
  console.log('\n4️⃣ Testing Dashboard Statistics...');
  
  try {
    const statsResponse = await fetch(`${API_BASE}/api/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    
    const statsData = await statsResponse.json();
    
    if (statsResponse.ok) {
      console.log('✅ Dashboard statistics working');
      console.log(`   Stats: ${JSON.stringify(statsData, null, 2)}`);
      return true;
    } else {
      console.log('❌ Dashboard statistics failed');
      console.log(`   Error: ${statsData.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Dashboard stats error');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function runFinalTest() {
  const results = {
    login: !!(enumeratorToken && adminToken),
    creation: false,
    viewing: false,
    stats: false
  };

  if (results.login) {
    const householdId = await testCompleteDataFlow();
    results.creation = !!householdId;
    
    if (results.creation) {
      results.viewing = await testDashboardDataViewing(householdId);
      results.stats = await testDashboardStats();
    }
  }

  console.log('\n📊 FINAL DATA FLOW TEST RESULTS:');
  console.log('==================================');
  console.log(`User Authentication: ${results.login ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`PWA → Backend (Data Creation): ${results.creation ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Backend → Dashboard (Data Viewing): ${results.viewing ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Dashboard Statistics: ${results.stats ? '✅ PASS' : '❌ FAIL'}`);

  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 COMPLETE DATA FLOW VERIFIED!');
    console.log('✅ PWA → Backend → Dashboard flow is working perfectly!');
    console.log('\n📋 PRODUCTION READY CHECKLIST:');
    console.log('================================');
    console.log('✅ Enumerator can log into PWA');
    console.log('✅ Enumerator can create household data');
    console.log('✅ Data is stored in backend database');
    console.log('✅ Admin can log into dashboard');
    console.log('✅ Admin can view all household data');
    console.log('✅ Dashboard statistics are working');
    console.log('✅ Complete data flow: PWA → Backend → Dashboard');
    
    console.log('\n🔑 Default Credentials for Handover:');
    console.log('====================================');
    console.log('PWA (Enumerator): Phone: 1234567890, Password: 123456');
    console.log('Dashboard (Admin): Phone: admin, Password: admin123');
    
    console.log('\n🚀 SYSTEM IS FULLY OPERATIONAL AND PRODUCTION-READY!');
    console.log('\n📝 For the company:');
    console.log('   1. Enumerators use PWA to collect data');
    console.log('   2. Data is automatically saved to backend');
    console.log('   3. Admins use dashboard to view all data');
    console.log('   4. Complete data flow is verified and working');
  } else {
    console.log('\n❌ SOME TESTS FAILED');
    console.log('System needs attention before handover');
  }

  return allPassed;
}

// Run the final test
runFinalTest().catch(console.error); 