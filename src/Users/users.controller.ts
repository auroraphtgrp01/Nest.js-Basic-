import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user.service'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Public, ResponseMessage, User } from '~/decorator/customize'
import mongoose from 'mongoose'
import { UserType } from '~/interface/user.interface'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /*
    Method: GET
    Path: /users
    Access: Admin
    Description: Get all users
  */
  @ResponseMessage('Get All Users For Admin')
  @Get()
  async getUser(@Query() queryString: string) {
    const result = await this.userService.getUser(queryString)
    return result
  }
  /*
    Method: POST
    Path: /users
    Access: Admin
    Description: Create new user from admin
  */
  @ResponseMessage('Create A User From Admin')
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto, @User() user: UserType) {
    return this.userService.createUser(CreateUserDto, user)
  }
  /*
    Method: PATCH
    Path: /users
    Access: JWT 
    Description: Update a user
  */
  @ResponseMessage('Update A User By ID')
  @Patch('/update')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: UserType) {
    const result = await this.userService.updateUser(updateUserDto, user)
    return {
      message: 'User Updated',
      result
    }
  }
  /*
    Method: DELETE
    Path: /users
    Access: JWT 
    Description: Delete a user
  */
  @ResponseMessage('Delete A User By ID')
  @Delete('/delete/:_id')
  async deleteUser(@Param('_id') _id: string, @User() user: UserType) {
    if (!mongoose.isValidObjectId(_id)) throw new UnauthorizedException('ID is not valid')
    const result = await this.userService.deleteUser(_id, user)
    return {
      message: 'User Deleted',
      result
    }
  }
  /*
    Method: GET
    Path: /users/find/:id
    Access: Public
    Description: Get user by id
  */
  @ResponseMessage('Get A User Info By ID')
  @Public()
  @Get('/find/:id')
  getUserById(@Param('id') user_id: string) {
    return this.userService.getUserById(user_id)
  }
}
