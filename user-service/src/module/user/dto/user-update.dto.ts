import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
	@IsOptional()
	@IsString()
	@Expose({ name: 'userName' })
	@ApiProperty({
		title: 'ФИО юзера',
		description: 'ФИО юзера',
		type: String,
		required: false,
	})
	userName?: string;

	@IsOptional()
	@IsString()
	@Expose({ name: 'userEmail' })
	@ApiProperty({
		title: 'E-mail юзера',
		description: 'E-mail юзера',
		type: String,
		required: false,
	})
	userEmail?: string;

	@IsOptional()
	@IsString()
	@Expose({ name: 'userPhone' })
	@ApiProperty({
		title: 'Телефон юзера',
		description: 'Телефон юзера',
		type: String,
		required: false,
	})
	userPhone?: string;

	@IsOptional()
	@IsNumber()
	@Expose({ name: 'carCounter' })
	@ApiProperty({
		title: 'Автомобилей в гараже пользолвателя',
		description: 'Автомобилей в гараже пользолвателя',
		type: Number,
		format: 'int32',
		required: false,
	})
	carCounter?: number;
}
