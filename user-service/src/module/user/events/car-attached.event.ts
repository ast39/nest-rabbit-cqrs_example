export class CarAttachedEvent {
	constructor(
		public readonly userId: number,
		public readonly carId: number,
	) {}
}
