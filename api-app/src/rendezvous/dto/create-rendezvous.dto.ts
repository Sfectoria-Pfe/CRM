import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
export class CreateRendezvousDto {

 @ApiProperty()
@IsNotEmpty ()
telephone :number
@ApiProperty()
@IsNotEmpty()
  email : string
  @ApiProperty()
@IsNotEmpty()
  temps  : Date
  @ApiProperty()
@IsNotEmpty()
 date   :Date
 @ApiProperty()
@IsNotEmpty()
 description :string
 @ApiProperty()
@IsNotEmpty()
  clientId  :number
}
