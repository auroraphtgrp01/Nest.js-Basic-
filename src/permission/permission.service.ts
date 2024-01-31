import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { UserType } from '~/interface/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Permission, PermissionDocument } from './schemas/permission.schema'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { PaginationQuery } from '~/utils/pagination_query.utils'
import { validateObjectID } from '~/utils/validation.utils'

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private readonly permissionModel: SoftDeleteModel<PermissionDocument>) {}
  async create(createPermissionDto: CreatePermissionDto, user: UserType) {
    const isExist = await this.permissionModel.findOne({
      apiPath: createPermissionDto.apiPath,
      method: createPermissionDto.method
    })
    console.log(isExist)
    if (isExist) {
      throw new HttpException(`Permission is exist: ${isExist.method} with ${isExist.apiPath}`, HttpStatus.BAD_REQUEST)
    }
    const result = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy: {
        _id: user._id,
        name: user.name
      }
    })
    return result
  }

  async findAll(queryString: string) {
    const result = await PaginationQuery(queryString, this.permissionModel)
    return result
  }

  async findOne(id: string) {
    if (!validateObjectID(id)) {
      throw new HttpException('ID is invalid', HttpStatus.BAD_REQUEST)
    }
    const result = await this.permissionModel.findById(id)
    return result
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: UserType) {
    const result = await this.permissionModel.updateOne(
      {
        _id: id
      },
      {
        ...updatePermissionDto,
        updatedBy: {
          _id: user._id,
          name: user.name
        }
      }
    )
    return result
  }

  async remove(id: string, user: UserType) {
    const result = await this.permissionModel.softDelete({
      _id: id
    })
    await this.permissionModel.updateOne(
      {
        _id: id
      },
      {
        deletedBy: {
          _id: user._id,
          name: user.name
        }
      }
    )
    return result
  }
}
