const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkAndCreateRequiredData() {
  try {
    console.log('🔍 Checking required foreign key data...\n');

    // Check if default user exists
    console.log('1️⃣ Checking default user...');
    const defaultUser = await prisma.users.findFirst({
      where: { phone_number: 'admin@thunai.com' }
    });

    if (!defaultUser) {
      console.log('❌ Default user not found. Creating...');
      await prisma.users.create({
        data: {
          full_name: 'Admin User',
          phone_number: 'admin@thunai.com',
          password_hash: 'admin123',
          role_id: 1,
          is_active: true
        }
      });
      console.log('✅ Default user created');
    } else {
      console.log('✅ Default user exists:', defaultUser.user_id);
    }

    // Check if default hamlet exists
    console.log('\n2️⃣ Checking default hamlet...');
    const defaultHamlet = await prisma.hamlets.findFirst({
      where: { hamlet_id: 1 }
    });

    if (!defaultHamlet) {
      console.log('❌ Default hamlet not found. Creating...');
      
      // First check if required parent data exists
      const defaultDistrict = await prisma.districts.findFirst({
        where: { district_id: 1 }
      });

      if (!defaultDistrict) {
        console.log('Creating default district...');
        await prisma.districts.create({
          data: {
            district_id: 1,
            name: 'Default District'
          }
        });
      }

      const defaultBlock = await prisma.blocks.findFirst({
        where: { block_id: 1 }
      });

      if (!defaultBlock) {
        console.log('Creating default block...');
        await prisma.blocks.create({
          data: {
            block_id: 1,
            name: 'Default Block',
            district_id: 1
          }
        });
      }

      const defaultPanchayat = await prisma.panchayats.findFirst({
        where: { panchayat_id: 1 }
      });

      if (!defaultPanchayat) {
        console.log('Creating default panchayat...');
        await prisma.panchayats.create({
          data: {
            panchayat_id: 1,
            name: 'Default Panchayat',
            block_id: 1
          }
        });
      }

      await prisma.hamlets.create({
        data: {
          hamlet_id: 1,
          name: 'Default Hamlet',
          panchayat_id: 1
        }
      });
      console.log('✅ Default hamlet created');
    } else {
      console.log('✅ Default hamlet exists:', defaultHamlet.hamlet_id);
    }

    // Check if default roles exist
    console.log('\n3️⃣ Checking default roles...');
    const roles = [
      { role_id: 1, role_name: 'Admin', description: 'System Administrator' },
      { role_id: 2, role_name: 'Enumerator', description: 'Kudumbashree Enumerator' },
      { role_id: 3, role_name: 'Anganwadi', description: 'Anganwadi Worker' },
      { role_id: 4, role_name: 'ST Promoter', description: 'ST Promoter' },
      { role_id: 5, role_name: 'ASHA Worker', description: 'ASHA Worker' },
      { role_id: 6, role_name: 'Panchayath Officer', description: 'Panchayath Officer' },
      { role_id: 7, role_name: 'District Officer', description: 'District/Block Officers' }
    ];

    for (const role of roles) {
      const existingRole = await prisma.roles.findUnique({
        where: { role_id: role.role_id }
      });

      if (!existingRole) {
        console.log(`Creating role: ${role.role_name}`);
        await prisma.roles.create({ data: role });
      }
    }
    console.log('✅ Default roles checked/created');

    console.log('\n🎉 All required foreign key data is ready!');
    console.log('📊 You can now create households without foreign key errors.');

  } catch (error) {
    console.error('❌ Error checking/creating required data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndCreateRequiredData(); 