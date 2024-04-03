import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOpportuniteDto {
  
    @ApiProperty()
    @IsNotEmpty()
    title:string;
    @ApiProperty()
    @IsNotEmpty()
    equipeId: number;
    
}
