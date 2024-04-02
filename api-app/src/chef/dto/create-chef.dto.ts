import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
export class CreateChefDto {
    @ApiProperty()
    @IsNotEmpty ()
    cin          :  number

    @ApiProperty()  
    @IsNotEmpty ()

    nom          :  string
    @IsNotEmpty ()

    @ApiProperty()
    prenom        : string
    @ApiProperty()
    @IsNotEmpty ()

    nomEntreprise : string
    @ApiProperty()
    @IsNotEmpty ()

    adresse       : string
    @ApiProperty()
    @IsNotEmpty ()

    email        :  string
    @ApiProperty()
    @IsNotEmpty ()

    telephone    :  number
    @ApiProperty()
    @IsNotEmpty ()

    datenaissance : Date
    @ApiProperty()
    @IsNotEmpty ()
    password :string

}
