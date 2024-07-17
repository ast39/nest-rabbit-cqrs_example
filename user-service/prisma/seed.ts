import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	try {
		//
	} catch (e) {
		console.error('Error creating user:', e);
	} finally {
		await prisma.$disconnect();
	}
}

main();
