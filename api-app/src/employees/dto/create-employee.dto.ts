import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class CreateEmployeeDto {
    @ApiProperty()
    cin: string;
    @ApiProperty()

    nom: string;
    @ApiProperty()

    prenom: string;
    @ApiProperty()

    adresse: string;
    @ApiProperty()

    email: string;
    @ApiProperty()

    telephone: string;
    @ApiProperty()

    role: Role; 
  }
  