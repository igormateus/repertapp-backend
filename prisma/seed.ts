import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     name: 'Igor Mateus',
  //     username: 'igormateus',
  //     email: 'igor@email.com',
  //     password: '$2b$10$UItE93OHUez5UQMtDWe9kOIx/iQkp/l597ggPdm6.xFB1/qJGPaaS', // 123456
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
