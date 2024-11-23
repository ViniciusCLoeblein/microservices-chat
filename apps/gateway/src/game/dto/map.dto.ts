import { ApiProperty } from '@nestjs/swagger';

export class CreateMapDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  houses: number;
}

export class AlterMapDto extends CreateMapDto {
  id: string;
}

export class GetMapDto {
  id: string | number;
}

export class DeleteMapDto implements GetMapDto {
  id: string | number;
}
