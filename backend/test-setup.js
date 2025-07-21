const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function setupTestData() {
  try {
    console.log('Setting up test data...');

    // Create default role if it doesn't exist
    const role = await prisma.roles.upsert({
      where: { role_id: 1 },
      update: {},
      create: {
        role_id: 1,
        role_name: 'Enumerator',
        description: 'Default enumerator role',
      },
    });

    // Create default user if it doesn't exist
    const user = await prisma.users.upsert({
      where: { phone_number: '1234567890' },
      update: {},
      create: {
        full_name: 'Default Enumerator',
        phone_number: '1234567890',
        password_hash: '$2a$10$default.hash.for.testing',
        role_id: 1,
        is_active: true,
      },
    });

    // Create default location hierarchy
    const district = await prisma.districts.upsert({
      where: { district_name: 'Palakkad' },
      update: {},
      create: { district_name: 'Palakkad' },
    });

    const block = await prisma.blocks.upsert({
      where: {
        block_name: 'Attappady',
        district_id: district.district_id,
      },
      update: {},
      create: {
        block_name: 'Attappady',
        district_id: district.district_id,
      },
    });

    const panchayat = await prisma.panchayats.upsert({
      where: {
        panchayat_name: 'Agali',
        block_id: block.block_id,
      },
      update: {},
      create: {
        panchayat_name: 'Agali',
        block_id: block.block_id,
      },
    });

    const hamlet = await prisma.hamlets.upsert({
      where: {
        hamlet_name: 'Default Hamlet',
        panchayat_id: panchayat.panchayat_id,
      },
      update: {},
      create: {
        hamlet_name: 'Default Hamlet',
        panchayat_id: panchayat.panchayat_id,
      },
    });

    console.log('Test data setup complete!');
    console.log('Default user ID:', user.user_id);
    console.log('Default hamlet ID:', hamlet.hamlet_id);
  } catch (error) {
    console.error('Error setting up test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupTestData();
