import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUrl } from '../../common/decorators/url.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserDto } from './dto/user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { UserCreateDto } from './dto/user-create.dto';
import { DefaultResponse } from '../../common/dto/default.response.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { StoreUserCommand } from './commands/impl/store-user.command';
import { ShowUserQuery } from './queries/impl/show-user.query';
import { IndexUserQuery } from './queries/impl/index-user.query';
import { DestroyUserCommand } from './commands/impl/destroy-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { EventPattern, Payload } from "@nestjs/microservices";
import { CarAttachedEvent } from "./events/car-attached.event";
import { CarDetachedEvent } from "./events/car-detached.event";

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Get()
	@ApiOperation({
		summary: 'Список пользователей',
		description: 'Получить список пользователей по фильтрам',
	})
	@ApiOkResponse({
		description: 'Список пользователей',
		type: UserDto,
		isArray: true,
		status: 200,
	})
	public async index(
		@CurrentUrl('user') url: string,
		@Query() query: UserQueryDto,
	): Promise<PaginationInterface<UserDto>> {
		return await this.queryBus.execute(new IndexUserQuery(url, query));
	}

	@Get(':user_id')
	@ApiOperation({
		summary: 'Пользователь по ID',
		description: 'Получить информацию о пользователе',
	})
	@ApiOkResponse({
		description: 'Информация о пользователе',
		type: UserDto,
		isArray: false,
		status: 200,
	})
	public async show(@Param('user_id') userId: number): Promise<UserDto> {
		return this.queryBus.execute(new ShowUserQuery(userId));
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: 'Добавление пользователя',
		description: 'Добавление пользователя',
	})
	@ApiOkResponse({
		description: 'Добавленный пользователь',
		type: UserDto,
		isArray: false,
		status: 201,
	})
	public async create(@Body() body: UserCreateDto): Promise<UserDto> {
		return this.commandBus.execute(new StoreUserCommand(body));
	}

	@Put(':user_id')
	@ApiOperation({
		summary: 'Редактирование пользователя',
		description: 'Редактирование пользователя',
	})
	@ApiOkResponse({
		description: 'Простой boolean статус действия',
		type: DefaultResponse,
		isArray: false,
		status: 200,
	})
	public async update(@Param('user_id') userId: number, @Body() body: UserUpdateDto): Promise<DefaultResponse> {
		return await this.commandBus.execute(new UpdateUserCommand(userId, body));
	}

	@Delete(':user_id')
	@ApiOperation({
		summary: 'Удаление пользователя',
		description: 'Удалить м',
	})
	@ApiOkResponse({
		description: 'Простой boolean статус действия',
		type: DefaultResponse,
		isArray: false,
		status: 200,
	})
	public async delete(@Param('user_id') userId: number): Promise<DefaultResponse> {
		return await this.commandBus.execute(new DestroyUserCommand(userId));
	}

	@EventPattern('carAttached')
	async handleCarAttachedEvent(@Payload() data: CarAttachedEvent) {
		console.log('==========');
		console.log('User Service : Listener [carAttached] : Incoming Data');
		console.log(data);
		console.log('==========');
		try {
			const user = await this.queryBus.execute(new ShowUserQuery(data.userId));
			const result = await this.commandBus.execute(
				new UpdateUserCommand(data.userId, {
					carCounter: +user.carCounter + 1,
				}),
			);
			console.log('==========');
			console.log('User Service : Listener [carAttached] : Success');
			console.log(result);
			console.log('==========');
		} catch (error) {
			console.log('==========');
			console.error('User Service : Listener [carAttached] : Error');
			console.error(error);
			console.log('==========');
		}
	}

	@EventPattern('carDetached')
	async handleCarDetachedEvent(@Payload() data: CarDetachedEvent) {
		console.log('==========');
		console.log('User Service : Listener [carDetached] : Incoming Data');
		console.log(data);
		console.log('==========');
		const user = await this.queryBus.execute(new ShowUserQuery(data.userId));
		try {
			const result = await this.commandBus.execute(
				new UpdateUserCommand(data.userId, {
					carCounter: +user.carCounter - 1,
				}),
			);
			console.log('==========');
			console.log('User Service : Listener [carDetached] : Success');
			console.log(result);
			console.log('==========');
		} catch (error) {
			console.log('==========');
			console.error('User Service : Listener [carDetached] : Error');
			console.error(error);
			console.log('==========');
		}
	}
}
