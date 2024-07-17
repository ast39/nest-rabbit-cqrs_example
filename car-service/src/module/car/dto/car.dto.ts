import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ICar } from '../interfaces/car.prisma.interface';

export class CarDto {
	public constructor(car: ICar) {
		this.carId = car.carId;
		this.carMark = car.carMark;
		this.carModel = car.carModel;
		this.created = car.createdAt;
	}

	@IsNumber()
	@Expose({ name: 'carId' })
	@ApiProperty({
		title: 'ID автомобиля',
		description: 'ID автомобиля',
		type: Number,
	})
	carId: number;

	@IsString()
	@Expose({ name: 'carMark' })
	@ApiProperty({
		title: 'Марка автомобиля',
		description: 'Марка автомобиля',
		type: String,
		required: true,
	})
	carMark: string;

	@IsString()
	@Expose({ name: 'carModel' })
	@ApiProperty({
		title: 'Модель автомобиля',
		description: 'Модель автомобиля',
		type: String,
		required: true,
	})
	carModel: string;

	@IsDate()
	@Expose({ name: 'created' })
	@ApiProperty({
		title: 'Время добавления',
		description: 'Время добавления комнаты',
		type: Date,
	})
	created: Date;
}
