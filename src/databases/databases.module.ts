import { LoggerService, Module } from '@nestjs/common'
import { DatabasesService } from './databases.service'
import { DatabasesController } from './databases.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User } from '~/decorator/customize'
import { UserSchema } from '~/Users/schemas/User.schema'
import { Permission, PermissionSchema } from '~/permission/schemas/permission.schema'
import { Role, RoleSchema } from '~/roles/schemas/role.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Permission.name,
        schema: PermissionSchema
      },
      {
        name: Role.name,
        schema: RoleSchema
      }
    ])
  ],
  controllers: [DatabasesController],
  providers: [DatabasesService]
})
export class DatabasesModule {}
