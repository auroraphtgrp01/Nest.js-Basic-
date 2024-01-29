import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/User.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hashPassword } from '~/utils/hashPassword'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { UserType } from '~/interface/user.interface'
import { PaginationQuery } from '~/utils/pagination_query.utils'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: SoftDeleteModel<UserDocument>) { }
  async getUser(qs: string) {
    const result = await PaginationQuery(qs, this.userModel)
    return result
  }
  async createUser(createUserDto: CreateUserDto, user: UserType) {
    const hashP = await hashPassword(createUserDto.password)
    const users = await this.userModel.create({
      ...createUserDto,
      password: hashP,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return users
  }
  async getUserById(user_id: string) {
    const user = await this.userModel.findById(user_id, { password: 0 })
    if (!user) return 'user not found'
    return user
  }
  async updateUser(updateUserDto: UpdateUserDto, user: UserType) {
    const hashP = await hashPassword(updateUserDto.password)
    const result = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto, updatedBy: { _id: user._id, email: user.email }, password: hashP }
    )
    return result
  }

  async deleteUser(user_id: string, user: UserType) {
    const result = await this.userModel.softDelete({ _id: user_id })
    await this.userModel.updateOne({ _id: user_id }, { deletedBy: { _id: user._id, email: user.email } })
    return result
  }
  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email })
    if (!user) return null
    return user
  }
  updateUserToken = async (refresh_token: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refresh_token })
  }
  getUserByRefreshToken = async (refresh_token: string) => {
    return await this.userModel.findOne({ refresh_token })
  }
}
