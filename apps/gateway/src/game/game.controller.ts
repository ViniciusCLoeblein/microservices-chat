import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { Observable } from 'rxjs';

@Controller('game')
@ApiTags('Games')
@ApiBearerAuth()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOperation({ summary: 'Api de teste no game' })
  @Get('teste')
  teste(): Observable<any> {
    return this.gameService.teste();
  }
}
