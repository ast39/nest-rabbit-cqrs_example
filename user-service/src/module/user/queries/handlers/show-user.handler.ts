import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowUserQuery } from '../impl/show-user.query';
import { UserService } from '../../user.service';

@QueryHandler(ShowUserQuery)
export class ShowUserHandler implements IQueryHandler<ShowUserQuery> {
	constructor(private readonly userService: UserService) {}

	async execute(query: ShowUserQuery) {
		const { id } = query;

		return this.userService.getUser(id);
	}
}
