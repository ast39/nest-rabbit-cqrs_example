import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CarUpdateDto {
	@IsOptional()
	@IsString()
	@Expose({ name: 'carMark' })
	@ApiProperty({
		title: 'Марка автомобиля',
		description: 'Марка автомобиля',
		type: String,
		required: false,
	})
	carMark?: string;

	@IsOptional()
	@IsString()
	@Expose({ name: 'carModel' })
	@ApiProperty({
		title: 'Модель автомобиля',
		description: 'Модель автомобиля',
		type: String,
		required: false,
	})
	carModel?: string;
}
