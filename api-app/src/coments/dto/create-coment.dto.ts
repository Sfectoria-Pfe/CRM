import { ApiProperty } from "@nestjs/swagger"

export class CreateComentDto {
    @ApiProperty()
       
    stageClientId: number
    @ApiProperty()

    content    :   string
}
