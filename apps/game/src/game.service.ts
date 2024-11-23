import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import {
  AlterMapDto,
  CreateMapDto,
  DeleteMapDto,
  GetMapDto,
} from 'apps/gateway/src/game/dto/map.dto';
import {
  CreateGameDto,
  DeleteGameDto,
  GetGameDto,
  PlayTurnDto,
} from 'apps/gateway/src/game/dto/game.dto';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async getMaps(): Promise<any> {
    return this.gameRepository.findMap();
  }

  async getMap(data: GetMapDto): Promise<any> {
    const map = await this.gameRepository.findMap(Number(data.id));
    return map[0] || null;
  }

  async createMap(data: CreateMapDto): Promise<any> {
    return await this.gameRepository.saveMap(data);
  }

  async alterMap(data: AlterMapDto): Promise<any> {
    return await this.gameRepository.saveMap({ ...data, id: Number(data.id) });
  }

  async deleteMap(data: DeleteMapDto): Promise<any> {
    return await this.gameRepository.deleteMap(Number(data.id));
  }

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  async createGame({
    player1Name,
    player2Name,
    mapId,
  }: CreateGameDto): Promise<any> {
    const game = await this.gameRepository.saveGame({
      player1Name,
      player2Name,
      mapId,
    });

    return {
      message: 'Jogo iniciado!',
      game: game,
    };
  }

  async playTurn(data: PlayTurnDto): Promise<any> {
    console.log('Recebido dados do turno: ', data);

    const game = await this.gameRepository.findGameById(Number(data.id));
    if (!game) {
      throw new Error('Jogo não encontrado');
    }

    if (game.winnerId !== null) {
      return {
        message: 'O jogo já acabou!',
        winner: game.winnerId === 1 ? game.player1Name : game.player2Name,
      };
    }

    const currentPlayer = game.currentPlayerIndex === 0 ? 'player1' : 'player2';
    const diceRoll = this.rollDice();

    game[`${currentPlayer}Position`] += diceRoll;

    if (game[`${currentPlayer}Position`] >= game.map.houses) {
      game[`${currentPlayer}Position`] = game.map.houses;
      game.winnerId = game.currentPlayerIndex === 0 ? 1 : 2;
    }

    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % 2;

    await this.gameRepository.updateGame(game);

    return {
      player: game[currentPlayer + 'Name'],
      dice: diceRoll,
      currentPosition: game[`${currentPlayer}Position`],
      winner: game.winnerId
        ? game.winnerId === 1
          ? game.player1Name
          : game.player2Name
        : null,
      tabuleiro: game,
    };
  }

  async getGame(data: GetGameDto): Promise<any> {
    const game = await this.gameRepository.findGameById(Number(data.id));

    if (!game) {
      throw new Error('Jogo não encontrado');
    }

    return {
      player1: {
        name: game.player1Name,
        position: game.player1Position,
      },
      player2: {
        name: game.player2Name,
        position: game.player2Position,
      },
      currentPlayer:
        game.currentPlayerIndex === 0 ? game.player1Name : game.player2Name,
      winner:
        game.winnerId !== null
          ? game.winnerId === 1
            ? game.player1Name
            : game.player2Name
          : null,
      map: game.map,
    };
  }

  async getGames(): Promise<any[]> {
    const games = await this.gameRepository.findAllGames();

    const gamesInfo = games.map((game) => ({
      gameId: game.id,
      player1: {
        name: game.player1Name,
        position: game.player1Position,
      },
      player2: {
        name: game.player2Name,
        position: game.player2Position,
      },
      currentPlayer:
        game.currentPlayerIndex === 0 ? game.player1Name : game.player2Name,
      winner:
        game.winnerId !== null
          ? game.winnerId === 1
            ? game.player1Name
            : game.player2Name
          : null,
      map: game.map,
    }));

    return gamesInfo;
  }

  async deleteGame(data: DeleteGameDto): Promise<any> {
    return await this.gameRepository.deleteGame(Number(data.id));
  }
}
