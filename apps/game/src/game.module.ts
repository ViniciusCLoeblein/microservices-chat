import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDatabaseService } from 'apps/generics/database';
import { GameControllerRMQ } from './game.controller.rmq';
import { GameService } from './game.service';
import { GameRepository } from './game.repository';
import { Map } from 'apps/entities/map.entity';
import { Game } from 'apps/entities/game.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return new PostgresDatabaseService(
          'GAME',
          config,
        ).getConnectionPostgres();
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Map, Game]),
  ],
  controllers: [GameControllerRMQ],
  providers: [GameRepository, GameService],
  exports: [GameService],
})
export class GameModule {}
