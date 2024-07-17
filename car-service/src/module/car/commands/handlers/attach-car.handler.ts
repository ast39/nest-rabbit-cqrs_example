import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarService } from '../../car.service';
import { AttachCarCommand } from '../impl/attach-car.command';

@CommandHandler(AttachCarCommand)
export class AttachCarHandler implements ICommandHandler<AttachCarCommand> {
	constructor(private readonly carService: CarService) {}

	async execute(command: AttachCarCommand) {
		return this.carService.attachCar(command);
	}
}
