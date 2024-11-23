import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMapDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
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

export class GetMapsDto {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  size: number;
}
