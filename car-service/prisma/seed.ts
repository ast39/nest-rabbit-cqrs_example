import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.$transaction(async (tx) => {
			await tx.car.create({
				data: {
					carMark: 'Lada',
					carModel: 'Granta',
				},
			});
		});

		await prisma.$transaction(async (tx) => {
			await tx.car.create({
				data: {
					carMark: 'BMW',
					carModel: 'X6',
				},
			});
		});

		await prisma.$transaction(async (tx) => {
			await tx.car.create({
				data: {
					carMark: 'AUDI',
					carModel: 'Q7',
				},
			});
		});
	} catch (e) {
		console.error('Error creating user:', e);
	} finally {
		await prisma.$disconnect();
	}
}

main();
