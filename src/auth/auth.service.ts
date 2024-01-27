import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { RegisterUserDto } from '~/Users/dto/create-user.dto'
import { User, UserDocument } from '~/Users/schemas/User.schema'
import { UserService } from '~/Users/user.service'

import { UserType } from '~/interface/user.interface'
import { comparePassword, hashPassword } from '~/utils/hashPassword'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: SoftDeleteModel<UserDocument>
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
  async register(registerUserDto: RegisterUserDto) {
    const hashP = await hashPassword(registerUserDto.password)
    const result = await this.userModel.create({ ...registerUserDto, password: hashP })
    return result
  }
}
