import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @ApiProperty()
  @IsNotEmpty()
  lieu: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  adminId: number;
}

