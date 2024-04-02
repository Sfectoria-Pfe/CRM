import { PartialType } from '@nestjs/swagger';
import { CreateEquipecommercialeDto } from './create-equipecommerciale.dto';

export class UpdateEquipecommercialeDto extends PartialType(CreateEquipecommercialeDto) {}
