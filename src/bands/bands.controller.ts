import { ConnectionArgs } from 'src/page/connection-args.dto';
import { Profile } from './../profile/entities/profile.dto';
import { Page } from './../page/page.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Controller('bands')
@UseGuards(JwtAuthGuard)
@ApiTags('profiles')
@ApiExtraModels(Page)
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  create(@Request() req, @Body() createBandDto: CreateBandDto) {
    return this.bandsService.create(req.user as Profile, createBandDto);
  }

  @Get()
  findAll(@Request() req, @Body() connectionArgs: ConnectionArgs) {
    return this.bandsService.findAll(req.user as Profile, connectionArgs);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.bandsService.findOne(req.user as Profile, id);
  }

  // @Patch(':id')
  // update(@Request() req, @Param('id') id: string, @Body() updateBandDto: UpdateBandDto) {
  //   return this.bandsService.update(req.user as Profile, id, updateBandDto);
  // }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.bandsService.remove(req.user as Profile, id);
  }
}
