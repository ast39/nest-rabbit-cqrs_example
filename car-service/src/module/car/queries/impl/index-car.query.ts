import { CarQueryDto } from '../../dto/car-query.dto';

export class IndexCarQuery {
	constructor(
		public readonly url: string,
		public readonly query: CarQueryDto,
	) {}
}
