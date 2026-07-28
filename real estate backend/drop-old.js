const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  console.log('Dropping old tables and types...');
  await p.$executeRawUnsafe('DROP TABLE IF EXISTS "Property" CASCADE');
  await p.$executeRawUnsafe('DROP TABLE IF EXISTS "PropertyAmenity" CASCADE');
  await p.$executeRawUnsafe('DROP TABLE IF EXISTS "PropertyImage" CASCADE');
  await p.$executeRawUnsafe('DROP TYPE IF EXISTS "PriceType_old" CASCADE');
  await p.$executeRawUnsafe('DROP TYPE IF EXISTS "PropertyTag_old" CASCADE');
  console.log('Done! Old tables and types removed.');
  await p.$disconnect();
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
