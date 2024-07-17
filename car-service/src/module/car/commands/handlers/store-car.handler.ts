import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreCarCommand } from '../impl/store-car.command';
import { CarService } from '../../car.service';

@CommandHandler(StoreCarCommand)
export class StoreCarHandler implements ICommandHandler<StoreCarCommand> {
	constructor(private readonly carService: CarService) {}

	async execute(command: StoreCarCommand) {
		return this.carService.createCar(command);
	}
}
