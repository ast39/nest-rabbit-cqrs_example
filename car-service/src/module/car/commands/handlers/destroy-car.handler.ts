import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarService } from '../../car.service';
import { DestroyCarCommand } from '../impl/destroy-car.command';

@CommandHandler(DestroyCarCommand)
export class DestroyCarHandler implements ICommandHandler<DestroyCarCommand> {
	constructor(private readonly carService: CarService) {}

	async execute(command: DestroyCarCommand) {
		return this.carService.deleteCar(command);
	}
}
