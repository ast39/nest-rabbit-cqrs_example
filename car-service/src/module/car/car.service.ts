import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CarRepository } from './car.repository';
import { DefaultResponse } from '../../common/dto/default.response.dto';
import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { CarDto } from './dto/car.dto';
import { IndexCarQuery } from './queries/impl/index-car.query';
import { StoreCarCommand } from './commands/impl/store-car.command';
import { UpdateCarCommand } from './commands/impl/update-car.command';
import { DestroyCarCommand } from './commands/impl/destroy-car.command';
import { ICar } from './interfaces/car.prisma.interface';
import {
	CarAlreadyExistException,
	CarNotFoundException,
	UserCarAlreadyExistException,
	UserCarNotFoundException,
} from './exceptions/Car.exceptions';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { AttachCarCommand } from './commands/impl/attach-car.command';
import { DetachCarCommand } from './commands/impl/detach-car.command';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class CarService {
	constructor(
		private prisma: PrismaService,
		private carRepo: CarRepository,
		private readonly commandBus: CommandBus,
		@Inject('CAR_SERVICE') private readonly rabbitClient: ClientProxy,
	) {}

	// Список автомобилей
	async carList(CarQuery: IndexCarQuery): Promise<PaginationInterface<CarDto>> {
		const { url, query } = CarQuery;
		const page = Number(query.page ?? 1);
		const limit = Number(query.limit ?? 10);
		const cars = await this.prisma.$transaction(async (tx) => {
			const cars = await this.carRepo.index(
				{
					skip: (page - 1) * limit,
					where: {
						carMark: query.carMark ?? undefined,
					},
					take: limit,
					orderBy: { createdAt: 'desc' },
				},
				tx,
			);
			if (!cars.length) throw new CarNotFoundException();

			return cars;
		});

		// Общее кол-во автомобилей
		const totalRows = await this.prisma.$transaction(async (tx) => {
			return await this.carRepo.totalRows({ where: {} }, tx);
		});

		// Ответ с пагинацией
		return {
			data: cars.map((car) => new CarDto(car as ICar)),
			meta: {
				currentPage: page,
				lastPage: Math.ceil(totalRows / limit),
				perPage: limit,
				from: (page - 1) * limit + 1,
				to: (page - 1) * limit + limit,
				total: totalRows,
				path: url,
			},
		};
	}

	// Найти автомобиль по ID
	async getCar(carId: number): Promise<CarDto> {
		return this.prisma.$transaction(async (tx) => {
			const car = await this.carRepo.show(carId, tx);
			if (!car) throw new CarNotFoundException();

			return new CarDto(car as ICar);
		});
	}

	// Добавить автомобиль
	async createCar(carData: StoreCarCommand): Promise<CarDto> {
		const { data } = carData;

		return this.prisma.$transaction(async (tx) => {
			const check = await this.carRepo.totalRows({
				where: {
					carMark: data.carMark ?? undefined,
					carModel: data.carModel ?? undefined,
				},
			});
			if (check > 0) throw new CarAlreadyExistException();
			const newCar = await this.carRepo.store(data, tx);

			return new CarDto(newCar as ICar);
		});
	}

	// Обновить автомобиль
	async updateCar(CarData: UpdateCarCommand): Promise<DefaultResponse> {
		const { id, data } = CarData;
		return this.prisma.$transaction(async (tx) => {
			await this.getCar(id);
			await this.carRepo.update(
				{
					where: { carId: +id },
					data: data,
				},
				tx,
			);

			return { success: true };
		});
	}

	// Удалить автомобиль
	async deleteCar(carData: DestroyCarCommand): Promise<DefaultResponse> {
		const { id } = carData;
		return this.prisma.$transaction(async (tx) => {
			await this.getCar(id);
			await this.carRepo.destroy({ carId: +id }, tx);

			return { success: true };
		});
	}

	// Добавить автомобиль пользователю
	async attachCar(body: AttachCarCommand): Promise<DefaultResponse> {
		const { data } = body;
		return this.prisma.$transaction(async (tx) => {
			// Нельзя иметь 2 одинаковые машины
			const check = await this.carRepo.carByUser(+data.carId, +data.userId);
			if (check) {
				throw new UserCarAlreadyExistException();
			}

			// Получим автомобиль
			await this.getCar(+data.carId);

			// Добавим его пользлвателю
			await this.carRepo.attachCar(data, tx);

			// Отправим задачу брокеру на обноавление кол-ва автомобилей у пользователя
			this.rabbitClient.emit('carAttached', { userId: data.userId, carId: data.carId });

			return { success: true };
		});
	}

	// Удалить автомобиль у пользователя
	async detachCar(body: DetachCarCommand): Promise<DefaultResponse> {
		const { data } = body;
		return this.prisma.$transaction(async (tx) => {
			const check = await this.carRepo.carByUser(+data.carId, +data.userId);
			if (!check) {
				throw new UserCarNotFoundException();
			}

			// Получим автомобиль
			await this.getCar(+data.carId);

			// Открепим пользователя
			await this.carRepo.detachCar(data, tx);

			// Отправим задачу брокеру на обноавление кол-ва автомобилей у пользователя
			this.rabbitClient.emit('carDetached', { userId: data.userId, carId: data.carId });

			return { success: true };
		});
	}
}
