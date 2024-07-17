import { UserUpdateDto } from '../../dto/user-update.dto';

export class UpdateUserCommand {
	constructor(
		public readonly id: number,
		public readonly data: UserUpdateDto,
	) {}
}
