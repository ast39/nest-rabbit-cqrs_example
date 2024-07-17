import { UserQueryDto } from '../../dto/user-query.dto';

export class IndexUserQuery {
	constructor(
		public readonly url: string,
		public readonly query: UserQueryDto,
	) {}
}
