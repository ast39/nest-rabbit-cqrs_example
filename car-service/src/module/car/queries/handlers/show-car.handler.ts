import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowCarQuery } from '../impl/show-car.query';
import { CarService } from '../../car.service';

@QueryHandler(ShowCarQuery)
export class ShowCarHandler implements IQueryHandler<ShowCarQuery> {
	constructor(private readonly carService: CarService) {}

	async execute(query: ShowCarQuery) {
		const { id } = query;

		return this.carService.getCar(id);
	}
}
