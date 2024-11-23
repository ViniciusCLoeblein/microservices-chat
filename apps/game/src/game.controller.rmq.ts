import { Controller } from '@nestjs/common';
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

@Controller()
export class GameControllerRMQ {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern({ cmd: 'Game.GetMaps' })
  getMaps(data: GetMapsDto): Promise<any> {
    return this.gameService.getMaps(data);
  }

  @MessagePattern({ cmd: 'Game.GetMap' })
  getMap(data: GetMapDto): Promise<any> {
    return this.gameService.getMap(data);
  }

  @MessagePattern({ cmd: 'Game.CreateMap' })
  createMap(data: CreateMapDto): Promise<any> {
    return this.gameService.createMap(data);
  }

  @MessagePattern({ cmd: 'Game.AlterMap' })
  alterMap(data: AlterMapDto): Promise<any> {
    return this.gameService.alterMap(data);
  }

  @MessagePattern({ cmd: 'Game.DeleteMap' })
  deleteMap(data: DeleteMapDto): Promise<any> {
    return this.gameService.deleteMap(data);
  }

  @MessagePattern({ cmd: 'Game.CreateGame' })
  createGame(data: CreateGameDto): Promise<any> {
    return this.gameService.createGame(data);
  }

  @MessagePattern({ cmd: 'Game.PlayTurn' })
  playTurn(data: PlayTurnDto): Promise<any> {
    return this.gameService.playTurn(data);
  }

  @MessagePattern({ cmd: 'Game.GetGames' })
  getGames(data: GetGamesDto): Promise<any> {
    return this.gameService.getGames(data);
  }

  @MessagePattern({ cmd: 'Game.GetGame' })
  getGame(data: GetGameDto): Promise<any> {
    return this.gameService.getGame(data);
  }

  @MessagePattern({ cmd: 'Game.DeleteGame' })
  deleteGame(data: DeleteGameDto): Promise<any> {
    return this.gameService.deleteGame(data);
  }
}
