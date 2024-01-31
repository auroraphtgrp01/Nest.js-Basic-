import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import mongoose from 'mongoose'
import { RESPONSE_MESSAGE } from '~/constant/message'

class Company {
  @IsNotEmpty({ message: '_Id company is required' })
  _id: mongoose.Schema.Types.ObjectId

  @IsNotEmpty({ message: 'Name conpany is required' })
  name: string
}
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  password: string

  @IsNotEmpty({ message: 'Age is required' })
  age: number

  @IsNotEmpty({ message: 'Gender is required' })
  gender: string

  @IsNotEmpty({ message: 'Role is required' })
  @IsMongoId({ message: RESPONSE_MESSAGE.MONGO_ID_IS_INVALID })
  role: string

  @IsNotEmpty({ message: 'Address is required' })
  address: string

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company
}
export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  password: string

  @IsNotEmpty({ message: 'Age is required' })
  age: number

  @IsNotEmpty({ message: 'Gender is required' })
  gender: string

  @IsNotEmpty({ message: 'Address is required' })
  address: string
}
