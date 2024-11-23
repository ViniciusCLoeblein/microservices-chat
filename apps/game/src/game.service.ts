import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async teste(): Promise<any> {
    return this.gameRepository.teste();
  }
}
