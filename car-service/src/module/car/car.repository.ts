import { Injectable } from '@nestjs/common';
import { IPrismaTR, PrismaService } from '../../prisma';
import { Car, UserCar } from "@prisma/client";
import { CarUpdateDto } from './dto/car-update.dto';
import { CarCreateDto } from './dto/car-create.dto';
import { ICarFilter, ICarOrder, ICarUnique } from './interfaces/car.prisma.interface';
import { UserCarDto } from "./dto/user-car.dto";
@Injectable()
export class CarRepository {
	constructor(private prisma: PrismaService) {}

	// Всего автомобилей без пагинации
	async totalRows(params: { cursor?: ICarUnique; where?: ICarFilter }, tx?: IPrismaTR): Promise<number> {
		const { cursor, where } = params;
		const prisma = tx ?? this.prisma;
		where.isDeleted = false;

		return prisma.car.count({ cursor, where });
	}

	// Список автомобилей
	async index(
		params: { skip?: number; take?: number; where?: ICarFilter; orderBy?: ICarOrder },
		tx?: IPrismaTR,
	): Promise<Car[]> {
		const { skip, take, where, orderBy } = params;
		const prisma = tx ?? this.prisma;
		where.isDeleted = false;

		return prisma.car.findMany({ skip, take, where, orderBy });
	}

	// Автомобиль по ID
	async show(carId: number, tx?: IPrismaTR): Promise<Car> {
		const prisma = tx ?? this.prisma;

		return prisma.car.findUnique({
			where: { carId: +carId, isDeleted: false },
		});
	}

	// Добавить автомобиль
	async store(data: CarCreateDto, tx?: IPrismaTR): Promise<Car> {
		const prisma = tx ?? this.prisma;

		return prisma.car.create({
			data: {
				carMark: data.carMark,
				carModel: data.carModel,
			},
		});
	}

	// Обновить автомобиль
	async update(params: { where: ICarUnique; data: CarUpdateDto }, tx?: IPrismaTR): Promise<Car> {
		const { where, data } = params;
		const prisma = tx ?? this.prisma;

		return prisma.car.update({ where, data });
	}

	// Удалить автомобиль (мягкое удаление)
	async destroy(where: ICarUnique, tx?: IPrismaTR): Promise<Car> {
		const prisma = tx ?? this.prisma;

		return prisma.car.update({ where, data: { isDeleted: true } });
	}

	// Есть ли данный автомобиль у данного пользователя?
	async carByUser(carId: number, userId: number, tx?: IPrismaTR): Promise<UserCar> {
		const prisma = tx ?? this.prisma;

		return prisma.userCar.findUnique({
			where: {
				carId_userId: {
					userId: userId,
					carId: carId!,
				},
			},
		});
	}

	// Добавление автомобиля пользователю
	async attachCar(body: UserCarDto, tx?: IPrismaTR): Promise<UserCar> {
		const prisma = tx ?? this.prisma;

		return prisma.userCar.create({
			data: {
				userId: +body.userId,
				carId: +body.carId,
			},
		});
	}

	// Удаление автомобиля у пользователя
	async detachCar(body: UserCarDto, tx?: IPrismaTR): Promise<UserCar> {
		const prisma = tx ?? this.prisma;

		return prisma.userCar.delete({
			where: { carId_userId: { userId: +body.userId, carId: +body.carId } },
		});
	}
}
