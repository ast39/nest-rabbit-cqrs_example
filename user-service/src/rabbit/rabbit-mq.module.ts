import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()
@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'USER_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
					],
					queue: 'user_queue',
					queueOptions: {
						durable: false,
					},
				},
			},
		]),
	],
	exports: [ClientsModule],
})
export class RabbitMQModule {}
