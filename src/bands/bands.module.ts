import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsController } from './bands.controller';

@Module({
  controllers: [BandsController],
  providers: [BandsService]
})
export class BandsModule {}
