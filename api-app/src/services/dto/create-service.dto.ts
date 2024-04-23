import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;


  @ApiProperty( )
  price?: number;

  @ApiProperty( )
  imageURL?: string;
}
