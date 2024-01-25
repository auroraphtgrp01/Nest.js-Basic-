import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '~/Users/user.service'
import { UserType } from '~/interface/user.interface'
import { comparePassword } from '~/utils/hashPassword'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    if (user) {
      const { password } = user
      const isValid = await comparePassword(pass, password)
      if (isValid) return user
    }
    return null
  }
  async login(user: UserType) {
    const { _id, role, name, email } = user
    const payload = {
      email: user.email,
      sub: 'Token Login',
      iss: 'From Server',
      _id,
      role,
      name
    }
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      role,
      name,
      email
    }
  }
}
