import { Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common'
import { Types } from 'mongoose'
@Injectable()
export class ParseObjectIDPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): any {
    Object.keys(value).map((item: any) => {
      const validObjectId = Types.ObjectId.isValid(value[item])
      if (validObjectId) {
        value[item] = Types.ObjectId.createFromHexString(value[item])
      }
    })
    return value
  }
}
