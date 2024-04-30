import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeService } from '@prisma/client';
export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  type: TypeService;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  imageURL?: string;
}
