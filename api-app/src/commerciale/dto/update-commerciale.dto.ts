import { PartialType } from '@nestjs/swagger';
import { CreateCommercialeDto } from './create-commerciale.dto';

export class UpdateCommercialeDto extends PartialType(CreateCommercialeDto) {}
