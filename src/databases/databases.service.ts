import { Injectable, LoggerService, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { UserDocument } from '~/Users/schemas/User.schema'
import { User } from '~/decorator/customize'
import { Permission, PermissionDocument } from '~/permission/schemas/permission.schema'
import { Role, RoleDocument } from '~/roles/schemas/role.schema'
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './seeder'
import { iif } from 'rxjs'
import { hashPassword } from '~/utils/hashPassword'

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Permission.name) private readonly permissionModel: SoftDeleteModel<PermissionDocument>,
    @InjectModel(Role.name) private readonly roleModel: SoftDeleteModel<RoleDocument>
  ) {}
  async onModuleInit() {
    const countUser = await this.userModel.countDocuments({})
    const countPermission = await this.permissionModel.countDocuments({})
    const countRole = await this.roleModel.countDocuments({})
    if (countPermission === 0) {
      await this.permissionModel.insertMany(INIT_PERMISSIONS)
    }

    if (countRole === 0) {
      const permissions = await this.permissionModel.find({}).select('_id')
      await this.roleModel.insertMany([
        {
          name: ADMIN_ROLE,
          description: 'Full Control',
          isActive: true,
          permissions: permissions
        },
        {
          name: USER_ROLE,
          description: 'Normal User',
          isActive: true,
          permissions: []
        }
      ])
    }
    if (countUser === 0) {
      const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE }).select('_id')
      const userRole = await this.roleModel.findOne({ name: USER_ROLE }).select('_id')
      await this.userModel.insertMany([
        {
          name: 'Le Minh Tuan',
          email: 'admin@gmail.com',
          password: await hashPassword('123'),
          age: 20,
          gender: 'Male',
          address: 'VietNam',
          role: adminRole?._id
        },
        {
          name: 'Le Minh Tuan User',
          email: 'users@gmail.com',
          password: await hashPassword('123'),
          age: 20,
          gender: 'Male',
          address: 'VietNam',
          role: userRole?._id
        }
      ])
    }
    if (countUser > 0 && countPermission > 0 && countRole > 0) {
      console.log('>>> ALREADY INIT SEEDER DATA...!')
    }
  }
}
