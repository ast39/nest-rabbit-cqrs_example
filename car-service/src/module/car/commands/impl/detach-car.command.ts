import { UserCarDto } from '../../dto/user-car.dto';

export class DetachCarCommand {
	constructor(public readonly data: UserCarDto) {}
}
