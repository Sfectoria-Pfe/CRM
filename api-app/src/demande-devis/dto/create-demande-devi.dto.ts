import { ApiProperty } from "@nestjs/swagger";

export class CreateDemandeDeviDto {
    
    @ApiProperty()
    dateDemande: Date
 @ApiProperty()
    sujet : string;
 @ApiProperty()

 description: string;
    @ApiProperty()

    clientId: number; 

}
