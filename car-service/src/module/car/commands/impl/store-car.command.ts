import { CarCreateDto } from '../../dto/car-create.dto';

export class StoreCarCommand {
	constructor(public readonly data: CarCreateDto) {}
}
