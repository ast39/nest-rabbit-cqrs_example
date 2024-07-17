import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CarCreateDto {
	@IsNotEmpty()
	@IsString()
	@Expose({ name: 'carMark' })
	@ApiProperty({
		title: 'Марка автомобиля',
		description: 'Марка автомобиля',
		type: String,
		required: true,
	})
	carMark: string;

	@IsNotEmpty()
	@IsString()
	@Expose({ name: 'carModel' })
	@ApiProperty({
		title: 'Модель автомобиля',
		description: 'Модель автомобиля',
		type: String,
		required: true,
	})
	carModel: string;
}
