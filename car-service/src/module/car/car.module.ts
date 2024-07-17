import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRepository } from './car.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ShowCarQuery } from './queries/impl/show-car.query';
import { IndexCarQuery } from './queries/impl/index-car.query';
import { StoreCarCommand } from './commands/impl/store-car.command';
import { UpdateCarCommand } from './commands/impl/update-car.command';
import { DestroyCarCommand } from './commands/impl/destroy-car.command';
import { ShowCarHandler } from './queries/handlers/show-car.handler';
import { IndexCarHandler } from './queries/handlers/index-car.handler';
import { StoreCarHandler } from './commands/handlers/store-car.handler';
import { UpdateCarHandler } from './commands/handlers/update-car.handler';
import { DestroyCarHandler } from './commands/handlers/destroy-car.handler';
import { AttachCarCommand } from './commands/impl/attach-car.command';
import { AttachCarHandler } from './commands/handlers/attach-car.handler';
import { DetachCarCommand } from './commands/impl/detach-car.command';
import { DetachCarHandler } from './commands/handlers/detach-car.handler';

@Module({
	imports: [CqrsModule],
	controllers: [CarController],
	providers: [
		CarService,
		CarRepository,
		ShowCarQuery,
		ShowCarHandler,
		IndexCarQuery,
		IndexCarHandler,
		StoreCarCommand,
		StoreCarHandler,
		UpdateCarCommand,
		UpdateCarHandler,
		DestroyCarCommand,
		DestroyCarHandler,
		AttachCarCommand,
		AttachCarHandler,
		DetachCarCommand,
		DetachCarHandler,
	],
	exports: [CarService, CarRepository],
})
export class CarModule {}
