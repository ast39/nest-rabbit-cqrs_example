import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarService } from '../../car.service';
import { DetachCarCommand } from '../impl/detach-car.command';

@CommandHandler(DetachCarCommand)
export class DetachCarHandler implements ICommandHandler<DetachCarCommand> {
	constructor(private readonly carService: CarService) {}

	async execute(command: DetachCarCommand) {
		return this.carService.detachCar(command);
	}
}
