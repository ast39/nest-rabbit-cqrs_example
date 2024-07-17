import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarService } from '../../car.service';
import { UpdateCarCommand } from '../impl/update-car.command';

@CommandHandler(UpdateCarCommand)
export class UpdateCarHandler implements ICommandHandler<UpdateCarCommand> {
	constructor(private readonly carService: CarService) {}

	async execute(command: UpdateCarCommand) {
		return this.carService.updateCar(command);
	}
}
