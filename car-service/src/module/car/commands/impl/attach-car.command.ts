import { UserCarDto } from '../../dto/user-car.dto';

export class AttachCarCommand {
	constructor(public readonly data: UserCarDto) {}
}
