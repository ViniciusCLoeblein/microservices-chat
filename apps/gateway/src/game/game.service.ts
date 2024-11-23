import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AlterMapDto,
  CreateMapDto,
  DeleteMapDto,
  GetMapDto,
  GetMapsDto,
} from './dto/map.dto';
import {
  CreateGameDto,
  DeleteGameDto,
  GetGameDto,
  GetGamesDto,
  PlayTurnDto,
} from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(
    @Inject('GAME_SERVICE_RMQ')
    private readonly clientRMQ: ClientRMQ,
  ) {}

  getMaps(data: GetMapsDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetMaps' }, data);
  }

  getMap(data: GetMapDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetMap' }, data);
  }

  createMap(data: CreateMapDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.CreateMap' }, data);
  }

  alterMap(data: AlterMapDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.AlterMap' }, data);
  }

  deleteMap(data: DeleteMapDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.DeleteMap' }, data);
  }

  createGame(data: CreateGameDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.CreateGame' }, data);
  }

  playTurn(data: PlayTurnDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.PlayTurn' }, data);
  }

  getGames(data: GetGamesDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetGames' }, data);
  }

  getGame(data: GetGameDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetGame' }, data);
  }

  deleteGame(data: DeleteGameDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.DeleteGame' }, data);
  }
}
