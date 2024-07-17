import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUrl } from '../../common/decorators/url.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CarDto } from './dto/car.dto';
import { CarQueryDto } from './dto/car-query.dto';
import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { CarCreateDto } from './dto/car-create.dto';
import { DefaultResponse } from '../../common/dto/default.response.dto';
import { CarUpdateDto } from './dto/car-update.dto';
import { StoreCarCommand } from './commands/impl/store-car.command';
import { ShowCarQuery } from './queries/impl/show-car.query';
import { IndexCarQuery } from './queries/impl/index-car.query';
import { DestroyCarCommand } from './commands/impl/destroy-car.command';
import { UpdateCarCommand } from './commands/impl/update-car.command';
import { UserCarDto } from './dto/user-car.dto';
import { AttachCarCommand } from './commands/impl/attach-car.command';
import { DetachCarCommand } from './commands/impl/detach-car.command';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCreatedEvent } from './events/user-created.event';

@ApiTags('Автомобили')
@Controller('car')
export class CarController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Список автомобилей',
		description: 'Получить список автомобилей по фильтрам',
	})
	@ApiQuery({
		description: 'Фильтра для поиска',
		type: CarQueryDto,
	})
	@ApiOkResponse({
		description: 'Список автомобилей',
		type: CarDto,
		isArray: true,
		status: 200,
	})
	public async index(
		@CurrentUrl('user') url: string,
		@Query() query: CarQueryDto,
	): Promise<PaginationInterface<CarDto>> {
		return await this.queryBus.execute(new IndexCarQuery(url, query));
	}

	@Get(':car_id')
	@ApiOperation({
		summary: 'Автомобиль по ID',
		description: 'Получить информацию об автомобилей=',
	})
	@ApiOkResponse({
		description: 'Информация об автомобиле',
		type: CarDto,
		isArray: false,
		status: 200,
	})
	public async show(@Param('car_id') carId: number): Promise<CarDto> {
		return this.queryBus.execute(new ShowCarQuery(carId));
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: 'Добавление автомобиля',
		description: 'Добавление автомобиля',
	})
	@ApiOkResponse({
		description: 'Добавленный автомобиль',
		type: CarDto,
		isArray: false,
		status: 201,
	})
	public async create(@Body() body: CarCreateDto): Promise<CarDto> {
		return this.commandBus.execute(new StoreCarCommand(body));
	}

	@Put(':car_id')
	@ApiOperation({
		summary: 'Редактирование автомобиля',
		description: 'Редактирование автомобиля',
	})
	@ApiOkResponse({
		description: 'Простой boolean статус действия',
		type: DefaultResponse,
		isArray: false,
		status: 200,
	})
	public async update(@Param('car_id') carId: number, @Body() body: CarUpdateDto): Promise<DefaultResponse> {
		return await this.commandBus.execute(new UpdateCarCommand(carId, body));
	}

	@Delete(':car_id')
	@ApiOperation({
		summary: 'Удаление автомобиля',
		description: 'Удалить автомобиля',
	})
	@ApiOkResponse({
		description: 'Простой boolean статус действия',
		type: DefaultResponse,
		isArray: false,
		status: 200,
	})
	public async delete(@Param('car_id') carId: number): Promise<DefaultResponse> {
		return await this.commandBus.execute(new DestroyCarCommand(carId));
	}

	@Post('attach')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: 'Добавление автомобиля пользователю',
		description: 'Добавление автомобиля пользователю',
	})
	@ApiOkResponse({
		description: 'Простой boolean статус действия',
		type: DefaultResponse,
		isArray: false,
		status: 201,
	})
	public async addUserToChat(@Body() body: UserCarDto): Promise<DefaultResponse> {
		return this.commandBus.execute(new AttachCarCommand(body));
	}

	@Post('detach')
	@ApiOperation({
		summary: 'Удаление автомобиля у пользователя',
		description: 'Удаление автомобиля у пользователя',
	})
	@ApiOkResponse({
		description: 'Простой boolean статус действия',
		type: DefaultResponse,
		isArray: false,
		status: 200,
	})
	public async removeUserFromChat(@Body() body: UserCarDto): Promise<DefaultResponse> {
		return this.commandBus.execute(new DetachCarCommand(body));
	}

	@MessagePattern('createUser')
	async handleCreateUser(@Payload() data: UserCreatedEvent) {
		console.log('==========');
		console.log('Car Service : Listener [createUser] : Incoming Data');
		console.log(data);
		console.log('==========');
		try {
			const result = await this.commandBus.execute(new AttachCarCommand({ userId: data.userId, carId: 1 }));
			console.log('==========');
			console.log('Car Service : Listener [createUser] : Success');
			console.log(result);
			console.log('==========');
		} catch (error) {
			console.log('==========');
			console.error('Car Service : Listener [createUser] : Error');
			console.error(error);
			console.log('==========');
		}
	}
}
