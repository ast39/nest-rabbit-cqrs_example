import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { MyLoggerModule } from './common/logger/my-logger.module';
import { CarModule } from './module/car/car.module';
import { RabbitMqModule } from './rabbit/rabbit-mq.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join('.env'),
		}),
		PrismaModule,
		RabbitMqModule,
		MyLoggerModule,
		CarModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
