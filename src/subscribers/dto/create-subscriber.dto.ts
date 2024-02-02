import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { RESPONSE_MESSAGE } from '~/constant/message'

export class CreateSubscriberDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGE.NAME_IS_REQUIRED })
  name: string

  @IsEmail({}, { message: RESPONSE_MESSAGE.EMAIL_IS_INVALID })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.EMAIL_IS_REQUIRED })
  email: string

  @IsNotEmpty({ message: RESPONSE_MESSAGE.SKILLS_IS_REQUIRED })
  @IsArray({ message: RESPONSE_MESSAGE.SKILLS_MUST_BE_ARRAY })
  @IsString({ each: true, message: RESPONSE_MESSAGE.SKILLS_MUST_BE_STRING })
  skills: string[]
}
