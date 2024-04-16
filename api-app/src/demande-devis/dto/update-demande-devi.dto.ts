import { PartialType } from '@nestjs/swagger';
import { CreateDemandeDeviDto } from './create-demande-devi.dto';

export class UpdateDemandeDeviDto extends PartialType(CreateDemandeDeviDto) {}
