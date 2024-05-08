import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class CreateOpportuniteDto {
  
    @ApiProperty()
    @IsNotEmpty()
    title:string;
    @ApiProperty()
    @IsNotEmpty()
    equipeId: number;
    @ApiProperty()
    @IsArray()
    serviceIds: number[];
    
}
