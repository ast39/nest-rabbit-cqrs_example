import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ShowUserQuery } from './queries/impl/show-user.query';
import { IndexUserQuery } from './queries/impl/index-user.query';
import { StoreUserCommand } from './commands/impl/store-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { DestroyUserCommand } from './commands/impl/destroy-user.command';
import { ShowUserHandler } from './queries/handlers/show-user.handler';
import { IndexUserHandler } from './queries/handlers/index-user.handler';
import { StoreUserHandler } from './commands/handlers/store-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DestroyUserHandler } from './commands/handlers/destroy-user.handler';
import { RabbitMQModule } from '../../rabbit/rabbit-mq.module';

@Module({
	imports: [CqrsModule, RabbitMQModule],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		ShowUserQuery,
		ShowUserHandler,
		IndexUserQuery,
		IndexUserHandler,
		StoreUserCommand,
		StoreUserHandler,
		UpdateUserCommand,
		UpdateUserHandler,
		DestroyUserCommand,
		DestroyUserHandler,
	],
	exports: [UserService, UserRepository],
})
export class UserModule {}
