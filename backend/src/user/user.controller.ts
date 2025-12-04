import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './decorators/user.decorator';
import type { Payload } from '../helpers/payload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findOne(@User() user: Payload) {
    return this.userService.findOne(user.sub);
  }

  @Put('')
  update(@User() user: Payload, @Body() updateUserDto: UpdateUserDto) {
    console.log('updateDTo', updateUserDto);
    return this.userService.update(user.sub, updateUserDto);
  }

  @Delete()
  remove(@User() user: Payload) {
    return this.userService.remove(user.sub);
  }
}
