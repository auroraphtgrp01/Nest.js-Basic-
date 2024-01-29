import { UnauthorizedException } from '@nestjs/common'
import mongoose from 'mongoose'

export const validateObjectID = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UnauthorizedException('Invalid ObjectId')
  }
  return true
}
