import { CarUpdateDto } from '../../dto/car-update.dto';

export class UpdateCarCommand {
	constructor(
		public readonly id: number,
		public readonly data: CarUpdateDto,
	) {}
}
