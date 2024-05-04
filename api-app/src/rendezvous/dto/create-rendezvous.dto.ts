import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
export class CreateRendezvousDto {

 @ApiProperty()
  heure :Date
  @ApiProperty()

  date  :Date
  @ApiProperty()

  typebien :string
  @ApiProperty()

  localisation :string
  @ApiProperty()

  description :string

}
