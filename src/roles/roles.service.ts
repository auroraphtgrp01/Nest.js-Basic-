import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role, RoleDocument } from './schemas/role.schema'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { UserType } from '~/interface/user.interface'
import { PaginationQuery } from '~/utils/pagination_query.utils'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private readonly roleModel: SoftDeleteModel<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto, user: UserType) {
    console.log(createRoleDto)
    const result = await this.roleModel.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return result
  }

  async findAll(queryString: string) {
    const query = JSON.parse(JSON.stringify(queryString))
    ;(query.populate = 'permissions'),
      (query.fields = 'permissions.name,permissions.method,permissions.module,permissions.apiPath')
    const result = await PaginationQuery(query, this.roleModel)
    return result
  }

  async findOne(id: string) {
    return (await this.roleModel.findById(id))?.populate({
      path: 'permissions',
      select: { _id: -1, apiPath: 1, name: 1, method: 1, module: 1 }
    })
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: UserType) {
    const result = await this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return result
  }

  async remove(id: string, user: UserType) {
    const result = await this.roleModel.softDelete({ _id: id })
    await this.roleModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return result
  }
}
