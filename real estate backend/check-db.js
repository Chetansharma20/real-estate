const path = require('path');
// Force fresh load
delete require.cache[require.resolve(path.join(__dirname, 'node_modules/@prisma/client'))];

const { PrismaClient } = require('./node_modules/@prisma/client');
const p = new PrismaClient();

async function main() {
  const t = await p.township.count();
  const pr = await p.project.count();
  const a = await p.amenity.count();
  const l = await p.lead.count();
  const b = await p.blogPost.count();

  console.log('=== Database Status ===');
  console.log('Townships:', t);
  console.log('Projects:', pr);
  console.log('Amenities:', a);
  console.log('Leads:', l);
  console.log('Blog Posts:', b);
  console.log('=======================');
  console.log('✅ All new tables are live!');

  await p.$disconnect();
}

main().catch(e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
