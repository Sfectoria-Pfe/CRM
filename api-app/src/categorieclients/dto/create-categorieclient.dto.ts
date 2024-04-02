import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateCategorieclientDto {

    @ApiProperty()
  @IsNotEmpty()
    nom         :string
    @ApiProperty()
  @IsNotEmpty()
  description :string
}
