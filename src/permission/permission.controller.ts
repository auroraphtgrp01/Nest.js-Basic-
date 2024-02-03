import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { ResponseMessage, User } from '~/decorator/customize'
import { UserType } from '~/interface/user.interface'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }
  /*
   * @Method: POST
   * @Route : /permission
   * @Description: Create a new permission
   * @Public: false
   */
  @ResponseMessage('Create a new permission')
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto, @User() user: UserType) {
    return await this.permissionService.create(createPermissionDto, user)
  }
  /*
   * @Method: POST
   * @Route : /permission
   * @Description: Get all permission with pagination
   * @Public: false
   */
  @ResponseMessage('Get all permission with pagination')
  @Get()
  findAll(@Query() queryString: string) {
    return this.permissionService.findAll(queryString)
  }
  /*
   * @Method: GET
   * @Route : /permission/:id
   * @Description: Get a permission by id
   * @Public: false
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id)
  }
  /*
   * @Method: PATCH
   * @Route : /permission/:id
   * @Description: Update a permission
   * @Public: false
   */
  @ResponseMessage('Update a permission')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user: UserType) {
    return await this.permissionService.update(id, updatePermissionDto, user)
  }
  /*
   * @Method: DELETE
   * @Route : /permission/:id
   * @Description: Delete a permission
   * @Public: false
   */
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    return this.permissionService.remove(id, user)
  }
}
