import { PartialType } from '@nestjs/swagger';
import { CreateCategorieclientDto } from './create-categorieclient.dto';

export class UpdateCategorieclientDto extends PartialType(CreateCategorieclientDto) {}
