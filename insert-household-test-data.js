const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = 'http://localhost:4000/api/households';

const testHousehold = {
  hamlet_id: 1,
  household_head_name: 'Test Head',
  address: 'Test Address',
  post_office: 'Test PO',
  colony_settlement_name: 'Test Colony',
  category: 'ST',
  micro_plan_number: 'MP-001',
  grama_panchayat: 'Test Panchayat',
  ward_number: '1',
  house_number: '101',
  family_members_count: 4,
  survey_date: new Date().toISOString(),
  enumerator_id: '00000000-0000-0000-0000-000000000001',
  members: [
    {
      name: 'Member 1',
      date_of_birth: '2000-01-01T00:00:00.000Z',
      gender: 'Male',
      relation_to_head: 'Son'
    }
  ]
};

async function insertTestHousehold() {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testHousehold)
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to insert: ${res.status} ${err}`);
    }
    const data = await res.json();
    console.log('✅ Test household inserted:', data);
  } catch (error) {
    console.error('❌ Error inserting test household:', error.message);
  }
}

insertTestHousehold(); 