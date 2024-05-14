import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateStageClientDto {
    @ApiProperty()
    @IsNotEmpty()
    description :string
    @ApiProperty()
    @IsNotEmpty()
    clientId :number
    @ApiProperty()
    @IsNotEmpty()
    stageId : number
}
