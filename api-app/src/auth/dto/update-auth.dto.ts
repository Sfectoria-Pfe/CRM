import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
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