import { IsEmail, IsMongoId, IsNotEmpty, isEmail } from 'class-validator'
import mongoose from 'mongoose'
import { HistoryResume } from '../schemas/resume.schema'
import { RESPONSE_MESSAGE } from '~/constant/message'

export class CreateResumeDto {
  @IsNotEmpty({ message: RESPONSE_MESSAGE.URL_IS_REQUIRED })
  url: string

  @IsMongoId({ message: RESPONSE_MESSAGE.ID_IS_INVALID })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.COMPANY_ID_IS_REQUIRED })
  companyID: mongoose.Types.ObjectId

  @IsMongoId({ message: RESPONSE_MESSAGE.ID_IS_INVALID })
  @IsNotEmpty({ message: RESPONSE_MESSAGE.JOB_ID_IS_REQUIRED })
  jobID: mongoose.Types.ObjectId
}
