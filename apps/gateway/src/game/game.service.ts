import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AlterMapDto,
  CreateMapDto,
  DeleteMapDto,
  GetMapDto,
} from './dto/map.dto';
import {
  CreateGameDto,
  DeleteGameDto,
  GetGameDto,
  PlayTurnDto,
} from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(
    @Inject('GAME_SERVICE_RMQ')
    private readonly clientRMQ: ClientRMQ,
  ) {}

  getMaps(): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetMaps' }, {});
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

  getGames(): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetGames' }, {});
  }

  getGame(data: GetGameDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.GetGame' }, data);
  }

  deleteGame(data: DeleteGameDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Game.DeleteGame' }, data);
  }
}
