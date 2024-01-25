import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user.service'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Public } from '~/decorator/customize'
import mongoose from 'mongoose'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  find() {
    return this.userService.getUser
  }

  @Post('')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto)
  }

  @Public()
  @Get('/find/:id')
  getUserById(@Param('id') user_id: string) {
    return this.userService.getUserById(user_id)
  }
  @Patch('/update')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.updateUser(updateUserDto)
    return {
      message: 'User Updated',
      result
    }
  }
  @Delete('/delete/:_id')
  async deleteUser(@Param('_id') _id: string) {
    if (!mongoose.isValidObjectId(_id)) throw new UnauthorizedException('ID is not valid')
    const result = await this.userService.deleteUser(_id)
    return {
      message: 'User Deleted',
      result
    }
  }
}
