import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'apps/entities/game.entity';
import { Map } from 'apps/entities/map.entity';
import { GetGamesDto } from 'apps/gateway/src/game/dto/game.dto';
import { GetMapsDto } from 'apps/gateway/src/game/dto/map.dto';
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

  async findMap(mapId: number) {
    return await this.mapRepository.findOneBy({ id: mapId });
  }

  async findAllMaps({ page, size }: GetMapsDto) {
    const take = size;
    const skip = (page - 1) * size;

    const [maps, totalMaps] = await this.mapRepository.findAndCount({
      skip,
      take,
    });

    const totalPages = Math.ceil(totalMaps / size);

    return {
      currentPage: Number(page),
      totalPages,
      pageSize: Number(size),
      totalItems: totalMaps,
      data: maps,
    };
  }

  async deleteMap(mapId: number) {
    return await this.mapRepository.delete(mapId);
  }

  async updateGame(game: Game): Promise<Game> {
    return await this.gameRepository.save(game);
  }

  async findAllGames({ page, size }: GetGamesDto): Promise<any> {
    const take = size;
    const skip = (page - 1) * size;

    const [games, totalGames] = await this.gameRepository.findAndCount({
      relations: { map: true },
      skip,
      take,
    });

    const totalPages = Math.ceil(totalGames / size);

    return {
      currentPage: Number(page),
      totalPages,
      pageSize: Number(size),
      totalItems: totalGames,
      data: games,
    };
  }

  async deleteGame(id: number) {
    return await this.gameRepository.delete(id);
  }
}
