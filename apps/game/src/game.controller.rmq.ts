import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GameService } from './game.service';

@Controller()
export class GameControllerRMQ {
  constructor(private readonly gameService: GameService) {}

  @MessagePattern({ cmd: 'Game.Teste' })
  teste(): Promise<any> {
    return this.gameService.teste();
  }
}
