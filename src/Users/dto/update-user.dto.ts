import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsNotEmpty } from 'class-validator'
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'Id is required' })
  _id: string
}

export class DeleteUserDto {
  @IsNotEmpty({ message: 'Id is required' })
  _id: string
}
