import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '~/Users/user.service'
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
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
