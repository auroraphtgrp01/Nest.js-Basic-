import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { User } from '~/decorator/customize'
import { UserType } from '~/interface/user.interface'

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  /*
   * @Method: POST
   * @Route : /roles
   * @Description: Create a new role
   * @Public: false
   */
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @User() user: UserType) {
    return await this.rolesService.create(createRoleDto, user)
  }
  /*
   * @Method: GET
   * @Route : /roles
   * @Description: Get Role With Pagination
   * @Public: false
   */
  @Get()
  findAll(@Query() queryString: string) {
    return this.rolesService.findAll(queryString)
  }
  /*
   * @Method: GET
   * @Route : /roles/:id
   * @Description: Get Role By Id
   * @Public: false
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id)
  }
  /*
   * @Method: PATCH
   * @Route : /roles/:id
   * @Description: Update a new role
   * @Public: false
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: UserType) {
    return await this.rolesService.update(id, updateRoleDto, user)
  }
  /*
   * @Method: DELETE
   * @Route : /roles/:id
   * @Description: delete a new role
   * @Public: false
   */
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    return this.rolesService.remove(id, user)
  }
}
