const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // Check existing enums in DB
  const enums = await p.$queryRaw`SELECT typname, enumlabel FROM pg_enum JOIN pg_type ON pg_enum.enumtypid = pg_type.oid WHERE typname IN ('PropertyType', 'MediaType', 'ProjectStatus', 'ConstructionStatus', 'PropertyView') ORDER BY typname, enumsortorder`;
  console.log('Existing enum values:');
  for (const row of enums) {
    console.log(`  ${row.typname}: ${row.enumlabel}`);
  }
  await p.$disconnect();
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
