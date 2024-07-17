export class CarDetachedEvent {
	constructor(
		public readonly userId: number,
		public readonly carId: number,
	) {}
}
