import { ApiPageResponse } from './../page/api-page-response.decorator';
import { ConnectionArgs } from './../page/connection-args.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Page } from './../page/page.dto';
import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { Band } from './entities/band.entity';

@Controller('bands')
@UseGuards(JwtAuthGuard)
@ApiTags('bands')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  @ApiCreatedResponse({ type: Band })
  async create(@Request() req, @Body() createBandDto: CreateBandDto) {
    return await this.bandsService.create(req.user.id, createBandDto);
  }

  @Get()
  @ApiPageResponse(Band)
  async findAll(@Request() req, @Query() connectionArgs: ConnectionArgs) {
    return await this.bandsService.findAll(req.user.id, connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: Band })
  async findOne(@Request() req, @Param('id') id: string) {
    return await this.bandsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Band })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBandDto: UpdateBandDto,
  ) {
    return await this.bandsService.update(req.user.id, id, updateBandDto);
  }
}
