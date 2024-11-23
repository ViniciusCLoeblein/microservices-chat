import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'apps/entities/game.entity';
import { Map } from 'apps/entities/map.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,

    @InjectRepository(Map)
    private readonly mapRepository: Repository<Map>,
  ) {}

  async saveMap(data: Partial<Map>): Promise<any> {
    return await this.mapRepository.save(data);
  }

  async saveGame(data: Partial<Game>): Promise<Game> {
    return await this.gameRepository.save(data);
  }

  async findGameById(gameId: number): Promise<Game | null> {
    return await this.gameRepository.findOne({
      where: { id: gameId },
      relations: { map: true },
    });
  }

  async findMap(mapId?: number) {
    return await this.mapRepository.find({ where: { id: mapId } });
  }

  async deleteMap(mapId: number) {
    return await this.mapRepository.delete(mapId);
  }

  async updateGame(game: Game): Promise<Game> {
    return await this.gameRepository.save(game);
  }

  async findAllGames(): Promise<Game[]> {
    return await this.gameRepository.find({
      relations: { map: true },
    });
  }

  async deleteGame(id: number) {
    return await this.gameRepository.delete(id);
  }
}
