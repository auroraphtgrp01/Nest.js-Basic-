import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserType } from '~/interface/user.interface'
import { RolesService } from '~/roles/roles.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly roleServie: RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY')
    })
  }
  async validate(payload: UserType) {
    const { _id, role, name, email } = payload
    const userRole = role as unknown as {
      _id: string
      name: string
    }
    const temp = (await this.roleServie.findOne(userRole._id)).toObject()
    return {
      _id,
      role,
      name,
      email,
      permissions: temp?.permissions ?? []
    }
  }
}
