import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RmqService } from 'apps/generics/rmq';
import { GameModule } from './game.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(GameModule);
  const configurationService = app.get(ConfigService);
  const optionsRmq = new RmqService(
    'GAME',
    configurationService,
  ).getConnectionRmq();
  app.connectMicroservice<MicroserviceOptions>(optionsRmq);
  app.startAllMicroservices();
  await app.init();
}

bootstrap();
