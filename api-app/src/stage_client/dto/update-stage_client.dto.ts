import { PartialType } from '@nestjs/swagger';
import { CreateStageClientDto } from './create-stage_client.dto';

export class UpdateStageClientDto extends PartialType(CreateStageClientDto) {}
