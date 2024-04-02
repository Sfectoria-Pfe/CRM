import { ApiProperty } from "@nestjs/swagger";
export class CreateCommercialeDto {
     
    @ApiProperty()
    nom         :   string;
    @ApiProperty()
    prenom      :   string;
    @ApiProperty()
    adresse      :  string;
    @ApiProperty()
    email        :  string;
    @ApiProperty()
    telephone    :  number;
    @ApiProperty()

    password  : string

}
