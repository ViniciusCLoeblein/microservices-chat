import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GameService } from './game.service';
import {
  AlterMapDto,
  CreateMapDto,
  DeleteMapDto,
  GetMapDto,
  GetMapsDto,
} from 'apps/gateway/src/game/dto/map.dto';
import {
  CreateGameDto,
  DeleteGameDto,
  GetGameDto,
  GetGamesDto,
  PlayTurnDto,
} from 'apps/gateway/src/game/dto/game.dto';
import { IExceptionFilter } from 'apps/generics/filters/IExceptionFilterGrpc';

@Controller()
export class GameControllerRMQ {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern({ cmd: 'Game.GetMaps' })
  @UseFilters(IExceptionFilter)
  getMaps(data: GetMapsDto): Promise<any> {
    return this.gameService.getMaps(data);
  }

  @MessagePattern({ cmd: 'Game.GetMap' })
  @UseFilters(IExceptionFilter)
  getMap(data: GetMapDto): Promise<any> {
    return this.gameService.getMap(data);
  }

  @MessagePattern({ cmd: 'Game.CreateMap' })
  @UseFilters(IExceptionFilter)
  createMap(data: CreateMapDto): Promise<any> {
    return this.gameService.createMap(data);
  }

  @MessagePattern({ cmd: 'Game.AlterMap' })
  @UseFilters(IExceptionFilter)
  alterMap(data: AlterMapDto): Promise<any> {
    return this.gameService.alterMap(data);
  }

  @MessagePattern({ cmd: 'Game.DeleteMap' })
  @UseFilters(IExceptionFilter)
  deleteMap(data: DeleteMapDto): Promise<any> {
    return this.gameService.deleteMap(data);
  }

  @MessagePattern({ cmd: 'Game.CreateGame' })
  @UseFilters(IExceptionFilter)
  createGame(data: CreateGameDto): Promise<any> {
    return this.gameService.createGame(data);
  }

  @MessagePattern({ cmd: 'Game.PlayTurn' })
  @UseFilters(IExceptionFilter)
  playTurn(data: PlayTurnDto): Promise<any> {
    return this.gameService.playTurn(data);
  }

  @MessagePattern({ cmd: 'Game.GetGames' })
  @UseFilters(IExceptionFilter)
  getGames(data: GetGamesDto): Promise<any> {
    return this.gameService.getGames(data);
  }

  @MessagePattern({ cmd: 'Game.GetGame' })
  @UseFilters(IExceptionFilter)
  getGame(data: GetGameDto): Promise<any> {
    return this.gameService.getGame(data);
  }

  @MessagePattern({ cmd: 'Game.DeleteGame' })
  @UseFilters(IExceptionFilter)
  deleteGame(data: DeleteGameDto): Promise<any> {
    return this.gameService.deleteGame(data);
  }
}
