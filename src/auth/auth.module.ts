import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '~/Users/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './passport/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './passport/jwt.strategy'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '~/Users/schemas/User.schema'
import { RolesModule } from '~/roles/roles.module'
import { RolesService } from '~/roles/roles.service'
import { Role, RoleSchema } from '~/roles/schemas/role.schema'

@Module({
  imports: [
    UserModule,
    RolesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME')
        }
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Role.name,
        schema: RoleSchema
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
