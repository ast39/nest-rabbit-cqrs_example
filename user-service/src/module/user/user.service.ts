import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { UserRepository } from './user.repository';
import { DefaultResponse } from '../../common/dto/default.response.dto';
import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { UserDto } from './dto/user.dto';
import { IndexUserQuery } from './queries/impl/index-user.query';
import { StoreUserCommand } from './commands/impl/store-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { DestroyUserCommand } from './commands/impl/destroy-user.command';
import { IUser } from './interfaces/user.prisma.interface';
import { UserAlreadyExistException, UserNotFoundException } from './exceptions/user.exceptions';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private userRepo: UserRepository,
		@Inject('USER_SERVICE') private readonly rabbitClient: ClientProxy,
	) {}

	// Список комнат
	async userList(userQuery: IndexUserQuery): Promise<PaginationInterface<UserDto>> {
		const { url, query } = userQuery;
		const page = Number(query.page ?? 1);
		const limit = Number(query.limit ?? 10);
		const users = await this.prisma.$transaction(async (tx) => {
			const users = await this.userRepo.index(
				{
					skip: (page - 1) * limit,
					where: {
						userName: query.userName ?? undefined,
						userEmail: query.userEmail ?? undefined,
						userPhone: query.userPhone ?? undefined,
					},
					take: limit,
					orderBy: { createdAt: 'desc' },
				},
				tx,
			);
			if (!users.length) throw new UserNotFoundException();

			return users;
		});

		// Общее кол-во юзеров
		const totalRows = await this.prisma.$transaction(async (tx) => {
			return await this.userRepo.totalRows({ where: {} }, tx);
		});

		// Ответ с пагинацией
		return {
			data: users.map((user) => new UserDto(user as IUser)),
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

	// Найти комнату по ID
	async getUser(userId: number): Promise<UserDto> {
		return this.prisma.$transaction(async (tx) => {
			const user = await this.userRepo.show(userId, tx);
			if (!user) throw new UserNotFoundException();

			return new UserDto(user as IUser);
		});
	}

	// Добавить юзера
	async createUser(userData: StoreUserCommand): Promise<UserDto> {
		const { data } = userData;

		return this.prisma.$transaction(async (tx) => {
			const check = await this.userRepo.totalRows({
				where: {
					userName: data.userName ?? undefined,
					userEmail: data.userEmail ?? undefined,
					userPhone: data.userPhone ?? undefined,
				},
			});

			if (check > 0) throw new UserAlreadyExistException();
			const newUser = await this.userRepo.store(data, tx);
			const user = new UserDto(newUser as IUser);

			// Отправим задачу брокеру на выдачу базового автомобился пользователя
			this.rabbitClient.emit('createUser', user);

			return user;
		});
	}

	// Обновить юзера
	async updateUser(userData: UpdateUserCommand): Promise<DefaultResponse> {
		const { id, data } = userData;
		return this.prisma.$transaction(async (tx) => {
			await this.getUser(id);
			await this.userRepo.update(
				{
					where: { userId: +id },
					data: data,
				},
				tx,
			);

			return { success: true };
		});
	}

	// Удалить юзера
	async deleteUser(userData: DestroyUserCommand): Promise<DefaultResponse> {
		const { id } = userData;
		return this.prisma.$transaction(async (tx) => {
			await this.getUser(id);
			await this.userRepo.destroy({ userId: +id }, tx);

			return { success: true };
		});
	}
}
