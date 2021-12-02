import { UserAuthenticate } from './../auth/user-authenticate.decorator';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async update(@Request() request, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(request.user.id, updateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async findOne(@UserAuthenticate('id') userId: string) {
    return await this.userService.findOne(userId);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiPageResponse(User)
  // async findAll(@Query() connectionArgs: ConnectionArgs) {
  //   return await this.userService.findAll(connectionArgs);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiNoContentResponse()
  // async remove(@Param('id') id: string) {
  //   return await this.userService.remove(id);
  // }
}
