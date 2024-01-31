import { IsNotEmpty, IsString } from 'class-validator'
import { RESPONSE_MESSAGE } from '~/constant/message'

export class CreatePermissionDto {
  @IsString({ message: RESPONSE_MESSAGE.NAME_MUST_BE_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.NAME_IS_REQUIRED })
  name: string

  @IsString({ message: RESPONSE_MESSAGE.API_PATH_MUST_BE_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.URL_IS_REQUIRED })
  apiPath: string

  @IsString({ message: RESPONSE_MESSAGE.METHOD_MUST_BE_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.URL_IS_REQUIRED })
  method: string

  @IsString({ message: RESPONSE_MESSAGE.MODULE_MUST_BE_STRING })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.MODULE_IS_REQUIRED })
  module: string
}
