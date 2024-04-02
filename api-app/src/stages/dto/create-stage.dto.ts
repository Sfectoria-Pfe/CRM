import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateStageDto {
    @ApiProperty()
    @IsNotEmpty()
    nom:string;
    @ApiProperty()
    @IsNotEmpty()
    opportuniteId:number;
}
