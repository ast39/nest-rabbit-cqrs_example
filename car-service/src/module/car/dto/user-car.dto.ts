import { IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserCarDto {
	@IsNotEmpty()
	@IsNumber()
	@Expose({ name: 'userId' })
	@ApiProperty({
		title: 'ID пользователя',
		description: 'ID пользователя',
		type: Number,
		format: 'int32',
		required: true,
	})
	userId: number;

	@IsNotEmpty()
	@IsNumber()
	@Expose({ name: 'carId' })
	@ApiProperty({
		title: 'ID автомобиля',
		description: 'ID автомобиля',
		type: Number,
		format: 'int32',
		required: true,
	})
	carId: number;
}
