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
import { USER_ROLE } from '~/databases/seeder'

import { UserType } from '~/interface/user.interface'
import { RolesService } from '~/roles/roles.service'
import { Role, RoleDocument } from '~/roles/schemas/role.schema'
import { comparePassword, hashPassword } from '~/utils/hashPassword'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: SoftDeleteModel<RoleDocument>,
    private readonly roleServie: RolesService
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    if (user) {
      const { password } = user
      const isValid = comparePassword(pass, password)
      if (!isValid) return null
      user.role
        ? (
            await user.populate({
              path: 'role',
              select: { name: 1, _id: 1 }
            })
          ).name
        : null
      const userRole = user.role as unknown as {
        _id: string
        name: string
      }
      const temp = await this.roleServie.findOne(userRole._id)
      const objUser = {
        ...user.toObject(),
        permissions: temp?.permissions ?? [],
        roless: userRole
      }
      return objUser
    }
    return null
  }
  async login(user: UserType, res: Response) {
    // const { permissions } = await this.roleServie.findOne(user.role._id) as any
    const { _id, role, name, email, permissions } = user
    const payload = {
      email: user.email,
      sub: 'Token Login',
      iss: 'From Server',
      _id,
      role,
      name,
      permissions
    }
    const refresh_token = this.signRefreshToken(payload)
    await this.usersService.updateUserToken(refresh_token, _id)
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 10000
    })
    return {
      user: {
        _id,
        role,
        name,
        email,
        permissions
      },
      access_token: this.jwtService.sign(payload),
      refresh_token
    }
  }
  async register(registerUserDto: RegisterUserDto) {
    const hashP = await hashPassword(registerUserDto.password)
    const userRole = await this.roleModel.findOne({ name: USER_ROLE })
    const result = await this.userModel.create({ ...registerUserDto, password: hashP, role: userRole?._id })
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
        user.role
          ? (
              await user.populate({
                path: 'role',
                select: { name: 1, _id: 1 }
              })
            ).name
          : null
        const userRole = user.role as unknown as {
          _id: string
          name: string
        }
        const temp = await this.roleServie.findOne(userRole._id)
        const objUser = {
          ...user.toObject(),
          permissions: temp?.permissions ?? [],
          roless: userRole
        }
        const { _id, role, name, email, permissions } = objUser
        const payload = {
          email: user.email,
          sub: 'Token Login',
          iss: 'From Server',
          _id,
          role,
          name,
          permissions
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
          user: {
            _id,
            role,
            name,
            email,
            permissions
          }
        }
      } else {
        throw new HttpException('Refresh Token Invalid', HTTP_STATUS.BAD_REQUEST)
      }
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
