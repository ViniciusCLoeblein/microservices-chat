import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { Observable } from 'rxjs';
import { AlterMapDto, CreateMapDto, GetMapsDto } from './dto/map.dto';
import { CreateGameDto, GetGamesDto } from './dto/game.dto';

@Controller('game')
@ApiTags('Games')
@ApiBearerAuth()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOperation({ summary: 'Todos os mapas' })
  @Get('maps')
  getMaps(@Query() data: GetMapsDto): Observable<any> {
    return this.gameService.getMaps(data);
  }

  @ApiOperation({ summary: 'Um mapa' })
  @Get('map/:id')
  getMap(@Param('id') id: string): Observable<any> {
    return this.gameService.getMap({ id });
  }

  @ApiOperation({ summary: 'Cria um mapa' })
  @Post('map')
  createMap(@Body() data: CreateMapDto): Observable<any> {
    return this.gameService.createMap(data);
  }

  @ApiOperation({ summary: 'Altera um mapa' })
  @Put('map/:id')
  alterMap(
    @Body() data: AlterMapDto,
    @Param('id') id: string,
  ): Observable<any> {
    return this.gameService.alterMap({ ...data, id });
  }

  @ApiOperation({ summary: 'Deleta um mapa' })
  @Delete('map/:id')
  deleteMap(@Param('id') id: string): Observable<any> {
    return this.gameService.deleteMap({ id });
  }

  @ApiOperation({ summary: 'Start game' })
  @Post('start')
  createGame(@Body() data: CreateGameDto): Observable<any> {
    return this.gameService.createGame(data);
  }

  @ApiOperation({ summary: 'Joga um turno' })
  @Put('play-turn/:id')
  playTurn(@Param('id') id: string): Observable<any> {
    return this.gameService.playTurn({ id });
  }

  @ApiOperation({ summary: 'Info de todos os games' })
  @Get('games')
  getGames(@Query() data: GetGamesDto): Observable<any> {
    return this.gameService.getGames(data);
  }

  @ApiOperation({ summary: 'Info do games' })
  @Get('game/:id')
  getGame(@Param('id') id: string): Observable<any> {
    return this.gameService.getGame({ id });
  }

  @ApiOperation({ summary: 'Deleta um jogo' })
  @Delete('game/:id')
  deleteGame(@Param('id') id: string): Observable<any> {
    return this.gameService.deleteGame({ id });
  }
}
