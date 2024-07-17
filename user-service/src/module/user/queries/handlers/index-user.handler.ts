import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { IndexUserQuery } from '../impl/index-user.query';

@QueryHandler(IndexUserQuery)
export class IndexUserHandler implements IQueryHandler<IndexUserQuery> {
	constructor(private readonly userService: UserService) {}

	async execute(query: IndexUserQuery) {
		return this.userService.userList(query);
	}
}
