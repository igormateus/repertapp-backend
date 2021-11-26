import { PartialType } from '@nestjs/swagger';
import { CreateBandDto } from './create-band.dto';

export class UpdateBandDto extends PartialType(CreateBandDto) {}
