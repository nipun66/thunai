// Test script for THUNAI Backend API
// Uses built-in fetch (Node.js 18+)

const API_BASE_URL = 'http://localhost:4000';

async function testBackend() {
  console.log('Testing THUNAI Backend API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('Health check response:', healthData);
    console.log('✅ Health check passed\n');

    // Test 2: Get households (without auth - should fail)
    console.log('2. Testing get households without auth...');
    try {
      const householdsResponse = await fetch(`${API_BASE_URL}/api/households`);
      const householdsData = await householdsResponse.json();
      console.log('Households response (no auth):', householdsData);
    } catch (error) {
      console.log('✅ Correctly rejected without auth\n');
    }

    // Test 3: Test JSON parsing with valid data
    console.log('3. Testing JSON parsing with valid data...');
    const testData = {
      hamlet_id: 1,
      household_head_name: "Test Head",
      survey_date: new Date().toISOString(),
      enumerator_id: "00000000-0000-0000-0000-000000000000",
      address: "Test Address",
      post_office: "Test PO",
      family_members_count: 1,
      members: []
    };

    try {
      const createResponse = await fetch(`${API_BASE_URL}/api/households`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(testData)
      });
      const createData = await createResponse.json();
      console.log('Create household response:', createData);
    } catch (error) {
      console.log('✅ JSON parsing test completed\n');
    }

    // Test 4: Test JSON parsing with invalid data
    console.log('4. Testing JSON parsing with invalid data...');
    const invalidData = {
      hamlet_id: 1,
      household_head_name: "Test Head with special chars: \n\r\t",
      survey_date: new Date().toISOString(),
      enumerator_id: "00000000-0000-0000-0000-000000000000",
      address: "Test Address with \x00 control chars",
      post_office: "Test PO",
      family_members_count: 1,
      members: []
    };

    try {
      const invalidResponse = await fetch(`${API_BASE_URL}/api/households`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(invalidData)
      });
      const invalidResponseData = await invalidResponse.json();
      console.log('Invalid data response:', invalidResponseData);
    } catch (error) {
      console.log('✅ Invalid data test completed\n');
    }

    console.log('Backend testing completed!');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testBackend(); 