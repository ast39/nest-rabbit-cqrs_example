import { PaginationDto } from '../../../common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CarQueryDto extends PaginationDto {
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
}
