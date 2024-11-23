import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RmqService } from 'apps/generics/rmq';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [GameController],
  providers: [
    {
      provide: 'GAME_SERVICE_RMQ',
      useFactory: (configService: ConfigService): ClientProxy =>
        ClientProxyFactory.create(
          new RmqService('GAME', configService).getConnectionRmq(),
        ),
      inject: [ConfigService],
    },
    GameService,
  ],
  exports: [GameService],
})
export class GameModule {}
