import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma';
import { MyLoggerModule } from './common/logger/my-logger.module';
import { UserModule } from './module/user/user.module';
import { RabbitMQModule } from './rabbit/rabbit-mq.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join('.env'),
		}),
		PrismaModule,
		RabbitMQModule,
		MyLoggerModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
