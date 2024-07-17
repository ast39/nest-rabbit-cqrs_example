import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
	@IsNotEmpty()
	@IsString()
	@Expose({ name: 'userName' })
	@ApiProperty({
		title: 'ФИО юзера',
		description: 'ФИО юзера',
		type: String,
		required: true,
	})
	userName: string;

	@IsNotEmpty()
	@IsString()
	@Expose({ name: 'userEmail' })
	@ApiProperty({
		title: 'E-mail юзера',
		description: 'E-mail юзера',
		type: String,
		required: true,
	})
	userEmail: string;

	@IsNotEmpty()
	@IsString()
	@Expose({ name: 'userPhone' })
	@ApiProperty({
		title: 'Телефон юзера',
		description: 'Телефон юзера',
		type: String,
		required: true,
	})
	userPhone: string;
}
