import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:4000';

async function testStatsEndpoint() {
  console.log('🧪 Testing Backend Stats Endpoint...');
  
  try {
    // Test health endpoint first
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    if (!healthResponse.ok) {
      console.log('❌ Backend server is not running. Please start it with: npm start');
      return;
    }
    console.log('✅ Backend server is running');
    
    // Test stats endpoint
    const statsResponse = await fetch(`${API_BASE_URL}/api/households/stats`);
    console.log('📊 Stats endpoint response status:', statsResponse.status);
    
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log('✅ Stats endpoint working!');
      console.log('📈 Dashboard Stats:');
      console.log('- Total Households:', stats.totalHouseholds);
      console.log('- Total Members:', stats.totalMembers);
      console.log('- Completed Surveys:', stats.completedSurveys);
      console.log('- Pending Surveys:', stats.pendingSurveys);
      console.log('- Hamlets Covered:', stats.hamletsCovered);
      console.log('- Panchayats Covered:', stats.panchayatsCovered);
      console.log('- Recent Activity:', stats.recentActivity);
    } else {
      const error = await statsResponse.text();
      console.log('❌ Stats endpoint failed:', error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testStatsEndpoint(); 