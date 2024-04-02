import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty()
    nom: string;
    @ApiProperty()
    prenom: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    telephone: number;
    @ApiProperty()
    adresse: string;
    @ApiProperty()
    password: string;
}
