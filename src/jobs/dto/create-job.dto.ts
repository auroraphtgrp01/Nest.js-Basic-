import { Type } from 'class-transformer'
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator'
import mongoose from 'mongoose'
import { RESPONSE_MESSAGE } from '~/constant/message'

class Company {
  @IsNotEmpty({ message: RESPONSE_MESSAGE.COMPANY_ID_IS_REQUIRED })
  _id: mongoose.Schema.Types.ObjectId

  @IsNotEmpty({ message: RESPONSE_MESSAGE.NAME_IS_REQUIRED })
  name: string
}
export class CreateJobDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGE.NAME_IS_REQUIRED })
  name: string

  @IsArray({ message: RESPONSE_MESSAGE.SKILLS_IS_ARRAY })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.SKILLS_IS_REQUIRED })
  skills: string[]

  @IsNotEmpty({ message: RESPONSE_MESSAGE.COMPANY_IS_REQUIRED })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company

  @IsNotEmpty({ message: RESPONSE_MESSAGE.LOCATION_IS_REQUIRED })
  location: string

  @IsNotEmpty({ message: RESPONSE_MESSAGE.SALARY_IS_REQUIRED })
  salary: number

  @IsNotEmpty({ message: RESPONSE_MESSAGE.QUANTITY_IS_REQUIRED })
  quantity: number

  @IsNotEmpty({ message: RESPONSE_MESSAGE.LEVEL_IS_REQUIRED })
  level: string

  @IsNotEmpty({ message: RESPONSE_MESSAGE.DESCRIPTION_IS_REQUIRED })
  description: string

  @IsNotEmpty({ message: RESPONSE_MESSAGE.START_DATE_IS_REQUIRED })
  @IsDateString()
  startDate: Date

  @IsDateString()
  @IsNotEmpty({ message: RESPONSE_MESSAGE.END_DATE_IS_REQUIRED })
  endDate: Date
}
