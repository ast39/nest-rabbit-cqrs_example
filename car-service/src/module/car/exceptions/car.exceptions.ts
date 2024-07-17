import { HttpException, HttpStatus } from '@nestjs/common';

export class CarNotFoundException extends HttpException {
	constructor() {
		super({ message: 'Автомобиль не найден' }, HttpStatus.NOT_FOUND);
	}
}

export class CarAlreadyExistException extends HttpException {
	constructor() {
		super({ message: 'Автомобиль с такими данными уже существует' }, HttpStatus.NOT_FOUND);
	}
}

export class UserCarNotFoundException extends HttpException {
	constructor() {
		super({ message: 'Автомобиль пользователя не найден' }, HttpStatus.NOT_FOUND);
	}
}

export class UserCarAlreadyExistException extends HttpException {
	constructor() {
		super({ message: 'У этого пользователя уже есть данный автомобиль' }, HttpStatus.NOT_FOUND);
	}
}
