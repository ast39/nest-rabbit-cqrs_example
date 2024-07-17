import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.prisma.interface';

export class UserDto {
	public constructor(user: IUser) {
		this.userId = user.userId;
		this.userName = user.userName;
		this.userEmail = user.userEmail;
		this.userPhone = user.userPhone;
		this.carCounter = user.carCounter;
		this.created = user.createdAt;
	}

	@IsNumber()
	@Expose({ name: 'userId' })
	@ApiProperty({
		title: 'ID юзера',
		description: 'ID юзера',
		type: Number,
	})
	userId: number;

	@IsString()
	@Expose({ name: 'userName' })
	@ApiProperty({
		title: 'ФИО юзера',
		description: 'ФИО юзера',
		type: String,
	})
	userName: string;

	@IsString()
	@Expose({ name: 'userEmail' })
	@ApiProperty({
		title: 'E-mail юзера',
		description: 'E-mail юзера',
		type: String,
	})
	userEmail: string;

	@IsString()
	@Expose({ name: 'userPhone' })
	@ApiProperty({
		title: 'Телефон юзера',
		description: 'Телефон юзера',
		type: String,
	})
	userPhone: string;

	@IsNumber()
	@Expose({ name: 'carCounter' })
	@ApiProperty({
		title: 'Кол-во автомобилей',
		description: 'Кол-во автомобилей юзера',
		type: String,
	})
	carCounter: number;

	@IsDate()
	@Expose({ name: 'created' })
	@ApiProperty({
		title: 'Время добавления',
		description: 'Время добавления комнаты',
		type: Date,
	})
	created: Date;
}
