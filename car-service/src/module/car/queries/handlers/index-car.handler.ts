import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CarService } from '../../car.service';
import { IndexCarQuery } from '../impl/index-car.query';

@QueryHandler(IndexCarQuery)
export class IndexCarHandler implements IQueryHandler<IndexCarQuery> {
	constructor(private readonly carService: CarService) {}

	async execute(query: IndexCarQuery) {
		return this.carService.carList(query);
	}
}
