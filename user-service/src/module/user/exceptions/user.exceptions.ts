import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
	constructor() {
		super({ message: 'Пользователь не найден' }, HttpStatus.NOT_FOUND);
	}
}

export class UserAlreadyExistException extends HttpException {
	constructor() {
		super({ message: 'Пользователь с такими персональными данными уже существует' }, HttpStatus.NOT_FOUND);
	}
}
