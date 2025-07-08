#!/usr/bin/env node

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:4000';

console.log('🔐 Simple Authentication Test\n');

async function testLogin(phone, password, userType) {
  console.log(`Testing ${userType} login...`);
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: phone, password: password })
    });

    const data = await response.json();
    
    if (response.ok && data.token) {
      console.log(`✅ ${userType} login successful`);
      console.log(`   User: ${data.user.full_name}`);
      console.log(`   Role: ${data.user.role_name}`);
      console.log(`   Token: ${data.token.substring(0, 20)}...`);
      return data.token;
    } else {
      console.log(`❌ ${userType} login failed`);
      console.log(`   Error: ${data.error || 'Unknown error'}`);
      console.log(`   Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ ${userType} login test failed`);
    console.log(`   Error: ${error.message}`);
    return null;
  }
}

async function runAuthTest() {
  console.log('Testing default user authentication...\n');
  
  const enumeratorToken = await testLogin('1234567890', '123456', 'Enumerator');
  console.log('');
  const adminToken = await testLogin('admin', 'admin123', 'Admin');
  
  console.log('\n📊 Authentication Test Results:');
  console.log('================================');
  console.log(`Enumerator: ${enumeratorToken ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Admin:      ${adminToken ? '✅ PASS' : '❌ FAIL'}`);
  
  if (enumeratorToken && adminToken) {
    console.log('\n🎉 Both default users are working!');
    console.log('✅ System is ready for production');
  } else {
    console.log('\n❌ Some default users are not working');
    console.log('⚠️  Check if default users were created');
  }
}

runAuthTest().catch(console.error); 