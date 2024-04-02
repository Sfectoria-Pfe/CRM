import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {

    nom: string;
    prenom: string;
    email: string;
    telephone: number;
    adresse: string;
    password: string;
}