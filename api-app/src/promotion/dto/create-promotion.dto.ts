import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePromotionDto {
    @ApiProperty()
    @IsNotEmpty()
    description: String
    @ApiProperty()
  @IsNotEmpty()
  pourcentage :number
  @ApiProperty()
  @IsNotEmpty()
  date_debut :Date
  @ApiProperty()
  @IsNotEmpty()
  date_fin: Date
  @ApiProperty()
  @IsNotEmpty()
  opportuniteId :number
  @ApiProperty()
  @IsNotEmpty()
  categorieClientId :number


}