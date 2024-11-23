import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @ApiProperty()
  @IsNotEmpty()
  player1Name: string;

  @ApiProperty()
  @IsNotEmpty()
  player2Name: string;

  @ApiProperty()
  @IsNotEmpty()
  mapId: number;
}

export class PlayTurnDto {
  id: string;
}

export class GetGameDto {
  id: string | number;
}

export class DeleteGameDto implements GetGameDto {
  id: string | number;
}

export class GetGamesDto {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  size: number;
}
