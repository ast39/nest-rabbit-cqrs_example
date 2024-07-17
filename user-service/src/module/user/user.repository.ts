import { Injectable } from '@nestjs/common';
import { IPrismaTR, PrismaService } from '../../prisma';
import { User } from '@prisma/client';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { IUserFilter, IUserOrder, IUserUnique } from './interfaces/user.prisma.interface';
@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	// Всего юзеров без пагинации
	async totalRows(params: { cursor?: IUserUnique; where?: IUserFilter }, tx?: IPrismaTR): Promise<number> {
		const { cursor, where } = params;
		const prisma = tx ?? this.prisma;
		where.isDeleted = false;

		return prisma.user.count({ cursor, where });
	}

	// Список комнат
	async index(
		params: { skip?: number; take?: number; where?: IUserFilter; orderBy?: IUserOrder },
		tx?: IPrismaTR,
	): Promise<User[]> {
		const { skip, take, where, orderBy } = params;
		const prisma = tx ?? this.prisma;
		where.isDeleted = false;

		return prisma.user.findMany({ skip, take, where, orderBy });
	}

	// Юзер по ID
	async show(userId: number, tx?: IPrismaTR): Promise<User> {
		const prisma = tx ?? this.prisma;

		return prisma.user.findUnique({
			where: { userId: +userId, isDeleted: false },
		});
	}

	// Добавить юзера
	async store(data: UserCreateDto, tx?: IPrismaTR): Promise<User> {
		const prisma = tx ?? this.prisma;
		return prisma.user.create({
			data: {
				userName: data.userName,
				userEmail: data.userEmail,
				userPhone: data.userPhone,
				isDeleted: false,
			},
		});
	}

	// Обновить юзера
	async update(params: { where: IUserUnique; data: UserUpdateDto }, tx?: IPrismaTR): Promise<User> {
		const { where, data } = params;
		const prisma = tx ?? this.prisma;

		return prisma.user.update({ where, data });
	}

	// Удалить юзера (мягкое удаление)
	async destroy(where: IUserUnique, tx?: IPrismaTR): Promise<User> {
		const prisma = tx ?? this.prisma;

		return prisma.user.update({ where, data: { isDeleted: true } });
	}
}
