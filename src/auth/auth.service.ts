import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Response } from 'express'
import ms from 'ms'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { RegisterUserDto } from '~/Users/dto/create-user.dto'
import { User, UserDocument } from '~/Users/schemas/User.schema'
import { UserService } from '~/Users/user.service'
import { HTTP_STATUS } from '~/constant/HTTP_STATUS'

import { UserType } from '~/interface/user.interface'
import { comparePassword, hashPassword } from '~/utils/hashPassword'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    if (user) {
      user.role
        ? (
            await user.populate({
              path: 'role',
              select: '-deletedAt -createdBy -createdAt -updatedAt -__v -isDeleted'
            })
          ).name
        : null
      const { password } = user
      const isValid = comparePassword(pass, password)
      if (isValid) return user
    }
    return null
  }
  async login(user: UserType, res: Response) {
    const { _id, role, name, email } = user
    const payload = {
      email: user.email,
      sub: 'Token Login',
      iss: 'From Server',
      _id,
      role,
      name
    }
    const refresh_token = this.signRefreshToken(payload)
    await this.usersService.updateUserToken(refresh_token, _id)
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 10000
    })
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      user: {
        _id,
        role,
        name,
        email
      }
    }
  }
  async register(registerUserDto: RegisterUserDto) {
    const hashP = await hashPassword(registerUserDto.password)
    const result = await this.userModel.create({ ...registerUserDto, password: hashP })
    return result
  }
  signRefreshToken = (payload: any) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KET'),
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) / 1000
    })
  }
  processRefreshToken = async (refresh_token: string, res: Response) => {
    try {
      await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KET')
      })
      const user = await this.usersService.getUserByRefreshToken(refresh_token)
      if (user) {
        const { _id, role, name, email } = user
        const payload = {
          email: user.email,
          sub: 'Token Login',
          iss: 'From Server',
          _id,
          role,
          name
        }
        const refresh_token = this.signRefreshToken(payload)
        await this.usersService.updateUserToken(refresh_token, _id.toString())
        res.clearCookie('refresh_token')
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 10000
        })
        return {
          access_token: this.jwtService.sign(payload),
          refresh_token,
          user: {
            _id,
            role,
            name,
            email
          }
        }
      } else {
        throw new HttpException('Refresh Token Invalid', HTTP_STATUS.BAD_REQUEST)
      }
      console.log(user)
    } catch (error) {
      throw new HttpException('Refresh Token Invalid', HTTP_STATUS.BAD_REQUEST)
    }
  }
  async logout(_id: string, res: Response) {
    console.log(_id)

    const x = await this.usersService.updateUserToken('', _id)
    console.log(x)

    res.clearCookie('refresh_token')
  }
}
