import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty()
  player1Name: string;

  @ApiProperty()
  player2Name: string;

  @ApiProperty()
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
