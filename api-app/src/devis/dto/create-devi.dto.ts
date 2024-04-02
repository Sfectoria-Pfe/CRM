import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateDeviDto {
        @ApiProperty()
      @IsNotEmpty()
        numero_devis: number;
        @ApiProperty()
        @IsNotEmpty()
        date_estimation :Date;
        @ApiProperty()
        @IsNotEmpty()
        montant_total:number ;
        @ApiProperty()
        @IsNotEmpty()
        prix_unitaire: number;
        @ApiProperty()
        @IsNotEmpty()
        service :string;
        @ApiProperty()
        @IsNotEmpty()
        TVA:number;
        @ApiProperty()
        @IsNotEmpty()
        clientId : number;
    
    
    }

