import { AuthDto } from './../auth/dto/auth.dto';
import { UserAuth } from './../auth/user-auth.decorator';
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
@ApiBearerAuth()
@ApiExtraModels(Page)
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  @ApiCreatedResponse({ type: Band })
  async create(
    @UserAuth() userAuth: AuthDto,
    @Body() createBandDto: CreateBandDto,
  ) {
    return await this.bandsService.create(userAuth.id, createBandDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: Band })
  async findOne(@UserAuth() userAuth: AuthDto, @Param('id') id: string) {
    return await this.bandsService.findOne(userAuth.id, id);
  }

  @Get()
  @ApiPageResponse(Band)
  async findAll(
    @UserAuth() userAuth: AuthDto,
    @Query() connectionArgs: ConnectionArgs,
  ) {
    return await this.bandsService.findAll(userAuth.id, connectionArgs);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Band })
  async update(
    @UserAuth() userAuth: AuthDto,
    @Param('id') id: string,
    @Body() updateBandDto: UpdateBandDto,
  ) {
    return await this.bandsService.update(userAuth.id, id, updateBandDto);
  }
}
