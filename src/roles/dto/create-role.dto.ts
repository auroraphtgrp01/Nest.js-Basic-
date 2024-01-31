import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import mongoose from 'mongoose'
import { RESPONSE_MESSAGE } from '~/constant/message'

export class CreateRoleDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGE.NAME_IS_REQUIRED })
  @IsString({ message: RESPONSE_MESSAGE.NAME_MUST_BE_STRING })
  name: string

  @IsNotEmpty({ message: RESPONSE_MESSAGE.DESCRIPTION_IS_REQUIRED })
  @IsString({ message: RESPONSE_MESSAGE.DESCRIPTION_IS_REQUIRED })
  description: string

  @IsNotEmpty({ message: RESPONSE_MESSAGE.STATUS_IS_REQUIRED })
  @IsBoolean({ message: RESPONSE_MESSAGE.STATUS_MUST_BE_BOOLEAN })
  isActive: boolean

  @IsArray({ message: RESPONSE_MESSAGE.PERMISSIONS_IS_ARRAY })
  @IsMongoId({ message: RESPONSE_MESSAGE.MONGO_ID_IS_INVALID, each: true })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.PERMISSIONS_IS_REQUIRED })
  permissions: mongoose.Schema.Types.ObjectId[]
}
