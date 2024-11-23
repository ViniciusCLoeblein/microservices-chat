import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { GameRepository } from './game.repository';
import {
  CreateMapDto,
  AlterMapDto,
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

// Mocking GameRepository
const mockGameRepository = {
  findAllMaps: jest.fn(),
  findMap: jest.fn(),
  saveMap: jest.fn(),
  deleteMap: jest.fn(),
  saveGame: jest.fn(),
  findGameById: jest.fn(),
  updateGame: jest.fn(),
  findAllGames: jest.fn(),
  deleteGame: jest.fn(),
};

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: GameRepository, useValue: mockGameRepository },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gameService).toBeDefined();
  });

  describe('getMaps()', () => {
    it('should call gameRepository.findAllMaps and return maps', async () => {
      const getMapsDto: GetMapsDto = { page: 1, size: 10 };
      const mockMaps = [{ id: 1, name: 'Map 1' }];
      mockGameRepository.findAllMaps.mockResolvedValue(mockMaps);

      const result = await gameService.getMaps(getMapsDto);

      expect(mockGameRepository.findAllMaps).toHaveBeenCalledWith(getMapsDto);
      expect(result).toEqual(mockMaps);
    });
  });

  describe('getMap()', () => {
    it('should return a map', async () => {
      const getMapDto: GetMapDto = { id: '1' };
      const mockMap = { id: 1, name: 'Map 1' };
      mockGameRepository.findMap.mockResolvedValue(mockMap);

      const result = await gameService.getMap(getMapDto);

      expect(mockGameRepository.findMap).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockMap);
    });
  });

  describe('createMap()', () => {
    it('should create a new map', async () => {
      const createMapDto: CreateMapDto = { name: 'New Map', houses: 10 };
      const mockMap = { id: 1, name: 'New Map' };
      mockGameRepository.saveMap.mockResolvedValue(mockMap);

      const result = await gameService.createMap(createMapDto);

      expect(mockGameRepository.saveMap).toHaveBeenCalledWith(createMapDto);
      expect(result).toEqual(mockMap);
    });
  });

  describe('alterMap()', () => {
    it('should update an existing map', async () => {
      const alterMapDto: AlterMapDto = {
        id: '1',
        name: 'Updated Map',
        houses: 10,
      };
      const mockMap = { id: 1, name: 'Updated Map' };
      mockGameRepository.saveMap.mockResolvedValue(mockMap);

      const result = await gameService.alterMap(alterMapDto);

      expect(mockGameRepository.saveMap).toHaveBeenCalledWith({
        ...alterMapDto,
        id: 1,
      });
      expect(result).toEqual(mockMap);
    });
  });

  describe('deleteMap()', () => {
    it('should delete a map', async () => {
      const deleteMapDto: DeleteMapDto = { id: '1' };
      mockGameRepository.deleteMap.mockResolvedValue(null);

      const result = await gameService.deleteMap(deleteMapDto);

      expect(mockGameRepository.deleteMap).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });

  describe('createGame()', () => {
    it('should create a new game', async () => {
      const createGameDto: CreateGameDto = {
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        mapId: 1,
      };
      const mockGame = {
        id: 1,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        mapId: 1,
      };
      mockGameRepository.saveGame.mockResolvedValue(mockGame);

      const result = await gameService.createGame(createGameDto);

      expect(mockGameRepository.saveGame).toHaveBeenCalledWith(createGameDto);
      expect(result).toEqual({
        message: 'Jogo iniciado!',
        game: mockGame,
      });
    });
  });

  describe('playTurn()', () => {
    it('should play a turn and return the updated game status', async () => {
      const playTurnDto: PlayTurnDto = { id: '1' };
      const mockGame = {
        id: 1,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        player1Position: 3,
        player2Position: 5,
        currentPlayerIndex: 0,
        winnerId: null,
        map: { houses: 10 },
        save: jest.fn(),
      };

      mockGameRepository.findGameById.mockResolvedValue(mockGame);
      mockGameRepository.updateGame.mockResolvedValue(mockGame);

      jest.spyOn(gameService, 'rollDice').mockReturnValue(4);

      const result = await gameService.playTurn(playTurnDto);

      expect(mockGameRepository.findGameById).toHaveBeenCalledWith(1);
      expect(mockGameRepository.updateGame).toHaveBeenCalledWith(mockGame);
      expect(result).toEqual({
        player: 'Player 1',
        dice: 4,
        currentPosition: 7,
        winner: null,
        tabuleiro: mockGame,
      });
    });

    it('should return a message if the game is already over', async () => {
      const playTurnDto: PlayTurnDto = { id: '1' };
      const mockGame = {
        id: 1,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        player1Position: 10,
        player2Position: 10,
        currentPlayerIndex: 0,
        winnerId: 1,
        map: { houses: 10 },
      };

      mockGameRepository.findGameById.mockResolvedValue(mockGame);

      const result = await gameService.playTurn(playTurnDto);

      expect(result).toEqual({
        message: 'O jogo já acabou!',
        winner: 'Player 1',
      });
    });
  });

  describe('getGame()', () => {
    it('should return the game details', async () => {
      const getGameDto: GetGameDto = { id: '1' };
      const mockGame = {
        id: 1,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        player1Position: 3,
        player2Position: 5,
        currentPlayerIndex: 0,
        winnerId: null,
        map: { houses: 10 },
      };

      mockGameRepository.findGameById.mockResolvedValue(mockGame);

      const result = await gameService.getGame(getGameDto);

      expect(mockGameRepository.findGameById).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        player1: { name: 'Player 1', position: 3 },
        player2: { name: 'Player 2', position: 5 },
        currentPlayer: 'Player 1',
        winner: null,
        map: mockGame.map,
      });
    });
  });

  describe('getGames()', () => {
    it('should return a paginated list of games', async () => {
      const getGamesDto: GetGamesDto = { page: 1, size: 10 };
      const mockGames = [
        {
          id: 1,
          player1Name: 'Player 1',
          player2Name: 'Player 2',
          currentPlayerIndex: 1, // Player 2 is the current player
          winnerId: 2, // Player 2 won
          map: { houses: 10 },
          player1Position: undefined,
          player2Position: undefined,
        },
      ];

      mockGameRepository.findAllGames.mockResolvedValue({
        games: mockGames,
        totalItems: 1,
        totalPages: 1,
      });

      const result = await gameService.getGames(getGamesDto);

      expect(mockGameRepository.findAllGames).toHaveBeenCalledWith(getGamesDto);
      expect(result).toEqual({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalItems: 1,
        games: [
          {
            gameId: 1,
            player1: { name: 'Player 1', position: undefined },
            player2: { name: 'Player 2', position: undefined },
            currentPlayer: 'Player 2', // Player 2 is the current player
            winner: 'Player 2', // Player 2 is the winner
            map: { houses: 10 },
          },
        ],
      });
    });
  });

  describe('deleteGame()', () => {
    it('should delete a game', async () => {
      const deleteGameDto: DeleteGameDto = { id: '1' };
      mockGameRepository.deleteGame.mockResolvedValue(null);

      const result = await gameService.deleteGame(deleteGameDto);

      expect(mockGameRepository.deleteGame).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });
});
