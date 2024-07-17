import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { DestroyUserCommand } from '../impl/destroy-user.command';

@CommandHandler(DestroyUserCommand)
export class DestroyUserHandler implements ICommandHandler<DestroyUserCommand> {
	constructor(private readonly userService: UserService) {}

	async execute(command: DestroyUserCommand) {
		return this.userService.deleteUser(command);
	}
}
