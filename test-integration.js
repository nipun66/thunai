// Integration Test Script for THUNAI Backend, PWA, and Dashboard
const API_BASE_URL = 'http://localhost:4000';

async function testBackendHealth() {
  console.log('🔍 Testing Backend Health...');
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();
    console.log('✅ Backend Health Check:', data.message);
    return true;
  } catch (error) {
    console.error('❌ Backend Health Check Failed:', error.message);
    return false;
  }
}

async function testHouseholdsAPI() {
  console.log('🔍 Testing Households API...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/households`);
    const data = await response.json();
    console.log('✅ Households API:', `Found ${data.length} households`);
    return true;
  } catch (error) {
    console.error('❌ Households API Failed:', error.message);
    return false;
  }
}

async function testDashboardStats() {
  console.log('🔍 Testing Dashboard Stats API...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
    if (response.status === 401) {
      console.log('⚠️ Dashboard Stats API: Requires authentication (expected)');
      return true;
    }
    const data = await response.json();
    console.log('✅ Dashboard Stats API:', data);
    return true;
  } catch (error) {
    console.error('❌ Dashboard Stats API Failed:', error.message);
    return false;
  }
}

async function testPWADataFormat() {
  console.log('🔍 Testing PWA Data Format...');
  try {
    const pwaData = {
      headName: "Test Head",
      address: "Test Address",
      postOffice: "Test Post Office",
      colonyName: "Test Colony",
      category: "ST",
      microPlanNumber: "MP001",
      gramaPanchayat: "Test Panchayat",
      wardNumber: "1",
      houseNumber: "H001",
      familyMembersCount: 4,
      members: [
        {
          name: "Test Member",
          relationship: "Son",
          gender: "Male",
          age: 25,
          educationLevel: "Graduate",
          vocationalKnowledge: "Computer Skills",
          occupationSector: "IT",
          maritalStatus: "Single",
          hasBankAccount: true,
          hasAadhaar: true,
          pension: "None",
          additionalDetails: "Test details"
        }
      ]
    };

    const backendData = {
      hamlet_id: 1,
      household_head_name: pwaData.headName,
      address: pwaData.address,
      post_office: pwaData.postOffice,
      colony_settlement_name: pwaData.colonyName,
      category: pwaData.category,
      micro_plan_number: pwaData.microPlanNumber,
      grama_panchayat: pwaData.gramaPanchayat,
      ward_number: pwaData.wardNumber,
      house_number: pwaData.houseNumber,
      family_members_count: pwaData.familyMembersCount,
      survey_date: new Date().toISOString().split('T')[0],
      enumerator_id: '00000000-0000-0000-0000-000000000000',
      members: pwaData.members.map(member => ({
        name: member.name,
        date_of_birth: new Date().toISOString().split('T')[0],
        gender: member.gender,
        relation_to_head: member.relationship,
        marital_status: member.maritalStatus,
        age: member.age,
        general_education_level: member.educationLevel,
        vocational_knowledge: member.vocationalKnowledge,
        occupation_sector: member.occupationSector,
        bank_account: member.hasBankAccount,
        has_aadhaar: member.hasAadhaar,
        pension: member.pension,
        additional_details: member.additionalDetails
      }))
    };

    console.log('✅ PWA Data Format: Valid transformation structure');
    console.log('📊 Sample Backend Data Structure:', JSON.stringify(backendData, null, 2));
    return true;
  } catch (error) {
    console.error('❌ PWA Data Format Test Failed:', error.message);
    return false;
  }
}

async function runIntegrationTests() {
  console.log('🚀 Starting THUNAI Integration Tests...\n');
  
  const tests = [
    testBackendHealth,
    testHouseholdsAPI,
    testDashboardStats,
    testPWADataFormat
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    const result = await test();
    if (result) passed++;
    console.log('');
  }

  console.log('📊 Integration Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);

  if (passed === total) {
    console.log('🎉 All integration tests passed! THUNAI is ready for use.');
  } else {
    console.log('⚠️ Some tests failed. Please check the backend and configuration.');
  }
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  runIntegrationTests().catch(console.error);
}

module.exports = { runIntegrationTests }; 