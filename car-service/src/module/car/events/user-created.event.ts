export class UserCreatedEvent {
	constructor(
		public readonly userId: number,
		public readonly userName: string,
		public readonly userEmail: string,
		public readonly userPhone: string,
		public readonly carCounter: number,
		public readonly created: Date,
	) {}
}
