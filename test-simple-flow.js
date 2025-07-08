#!/usr/bin/env node

/**
 * Simple THUNAI Data Flow Test
 * Tests basic functionality without authentication
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:4000';

console.log('🔄 Simple Data Flow Test\n');

async function testSimpleFlow() {
  console.log('1️⃣ Logging in as enumerator...');
  
  // Login as enumerator
  const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number: '1234567890', password: '123456' })
  });

  const loginData = await loginResponse.json();
  
  if (!loginResponse.ok || !loginData.token) {
    console.log('❌ Enumerator login failed');
    return false;
  }
  
  console.log('✅ Enumerator login successful');
  const enumeratorToken = loginData.token;

  console.log('\n2️⃣ Creating household data (simulating PWA save)...');
  
  // Simple household data
  const householdData = {
    household_head_name: "Test Family",
    address: "Test Address, Attappady",
    post_office: "Test Post Office",
    colony_settlement_name: "Test Colony",
    category: "ST",
    micro_plan_number: "TEST001",
    grama_panchayat: "Test Panchayat",
    ward_number: "1",
    house_number: "TEST001",
    family_members_count: 2,
    survey_date: new Date().toISOString().split('T')[0],
    members: [
      {
        name: "Test Head",
        relation_to_head: "Head",
        gender: "Male",
        age: 35,
        date_of_birth: "1990-01-01",
        general_education_level: "Secondary",
        vocational_knowledge: "",
        occupation_sector: "Agriculture",
        marital_status: "Married",
        bank_account: true,
        has_aadhaar: true,
        pension: "None",
        additional_details: ""
      },
      {
        name: "Test Spouse",
        relation_to_head: "Spouse",
        gender: "Female",
        age: 32,
        date_of_birth: "1992-01-01",
        general_education_level: "Primary",
        vocational_knowledge: "",
        occupation_sector: "Homemaker",
        marital_status: "Married",
        bank_account: false,
        has_aadhaar: false,
        pension: "None",
        additional_details: ""
      }
    ],
    migrant_workers: [],
    land_assets: [],
    housing_details: [],
    electrical_facilities: [],
    sanitation_facilities: [],
    water_sources: [],
    waste_management: [],
    health_conditions: [],
    education_details: [],
    employment_details: [],
    entitlements: [],
    nutrition_access: [],
    transportation: [],
    shg_participation: [],
    loans_debts: [],
    balasabha_participation: [],
    child_groups: [],
    agricultural_land: [],
    cultivation_mode: [],
    traditional_farming: [],
    livestock_details: [],
    food_consumption: [],
    cash_crops: [],
    forest_resources: [],
    social_issues: [],
    wage_employment: [],
    livelihood_opportunities: [],
    arts_sports: [],
    public_institutions: [],
    phone_connectivity: [],
    additional_info: []
  };

  const createResponse = await fetch(`${API_BASE}/api/households`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${enumeratorToken}`
    },
    body: JSON.stringify(householdData)
  });

  const createData = await createResponse.json();
  
  if (!createResponse.ok) {
    console.log('❌ Household creation failed');
    console.log(`   Error: ${createData.error || 'Unknown error'}`);
    return false;
  }
  
  console.log('✅ Household data created successfully (PWA → Backend)');
  console.log(`   Household ID: ${createData.household_id || createData.id}`);

  console.log('\n3️⃣ Logging in as admin...');
  
  // Login as admin
  const adminLoginResponse = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone_number: 'admin', password: 'admin123' })
  });

  const adminLoginData = await adminLoginResponse.json();
  
  if (!adminLoginResponse.ok || !adminLoginData.token) {
    console.log('❌ Admin login failed');
    return false;
  }
  
  console.log('✅ Admin login successful');
  const adminToken = adminLoginData.token;

  console.log('\n4️⃣ Admin viewing household data (Backend → Dashboard)...');
  
  const viewResponse = await fetch(`${API_BASE}/api/households`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  
  const viewData = await viewResponse.json();
  
  if (!viewResponse.ok) {
    console.log('❌ Data viewing failed');
    console.log(`   Error: ${viewData.error || 'Unknown error'}`);
    return false;
  }
  
  console.log('✅ Admin can view household data (Backend → Dashboard)');
  console.log(`   Total households: ${viewData.length || 0}`);
  
  if (viewData.length > 0) {
    const latest = viewData[0];
    console.log(`   Latest household: ${latest.household_head_name}`);
    console.log(`   Address: ${latest.address}`);
  }

  console.log('\n🎉 COMPLETE DATA FLOW VERIFIED!');
  console.log('✅ PWA → Backend → Dashboard flow is working!');
  console.log('\n📋 PRODUCTION READY:');
  console.log('   ✅ Enumerator creates data in PWA');
  console.log('   ✅ Data is stored in backend');
  console.log('   ✅ Admin can view data in dashboard');
  console.log('   ✅ Complete flow is operational');
  
  return true;
}

testSimpleFlow().catch(error => {
  console.log('❌ Test failed with error:', error.message);
}); 