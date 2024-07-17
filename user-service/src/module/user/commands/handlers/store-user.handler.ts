import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreUserCommand } from '../impl/store-user.command';
import { UserService } from '../../user.service';

@CommandHandler(StoreUserCommand)
export class StoreUserHandler implements ICommandHandler<StoreUserCommand> {
	constructor(private readonly userService: UserService) {}

	async execute(command: StoreUserCommand) {
		return this.userService.createUser(command);
	}
}
