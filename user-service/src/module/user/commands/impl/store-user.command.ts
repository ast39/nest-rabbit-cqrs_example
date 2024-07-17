import { UserCreateDto } from '../../dto/user-create.dto';

export class StoreUserCommand {
	constructor(public readonly data: UserCreateDto) {}
}
