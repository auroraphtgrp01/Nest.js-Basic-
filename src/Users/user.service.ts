import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/User.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HTTP_STATUS } from '~/constant/HTTP_STATUS'
import { hashPassword } from '~/utils/hashPassword'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: SoftDeleteModel<UserDocument>) {}
  getUser(): string {
    return 'hellooooo'
  }
  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashP = await hashPassword(createUserDto.password)
      const users = await this.userModel.create({ ...createUserDto, password: hashP })
      return users
    } catch (error) {
      return error
    }
  }
  async getUserById(user_id: string) {
    try {
      const user = await this.userModel.findById(user_id)
      if (!user) return 'user not found'
      return user
    } catch (error) {
      throw new HttpException(
        {
          message: 'Exception Error',
          data: error.toString()
        },
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    }
  }
  async updateUser(updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.updateOne(
        { _id: updateUserDto._id },
        { name: updateUserDto.name, email: updateUserDto.email }
      )
      return user
    } catch (error) {
      return error.toString()
    }
  }

  async deleteUser(user_id: string) {
    try {
      const result = await this.userModel.softDelete({ _id: user_id })
      return result
    } catch (error) {
      return error
    }
  }
  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email })
    if (!user) return null
    return user
  }
}
