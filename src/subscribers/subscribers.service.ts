import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'
import { UpdateSubscriberDto } from './dto/update-subscriber.dto'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { SubcribersDocument, Subscriber } from './schemas/subscriber.schema'
import { UserType } from '~/interface/user.interface'
import { PaginationQuery } from '~/utils/pagination_query.utils'

@Injectable()
export class SubscribersService {
  constructor(@InjectModel(Subscriber.name) private readonly subscriberService: SoftDeleteModel<SubcribersDocument>) {}
  async create(createSubscriberDto: CreateSubscriberDto, user: UserType) {
    const isExist = await this.subscriberService.findOne({ email: createSubscriberDto.email })
    if (isExist) throw new HttpException('Subscriber already exist', HttpStatus.BAD_REQUEST)
    const result = await this.subscriberService.create({
      ...createSubscriberDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return result
  }

  async findAll(queryString: string) {
    const x = await this.subscriberService.find()
    console.log(x)

    const result = await PaginationQuery(queryString, this.subscriberService)
    return result
  }

  async findOne(id: string) {
    return await this.subscriberService.findById(id)
  }

  async update(id: string, updateSubscriberDto: UpdateSubscriberDto, user: UserType) {
    const result = await this.subscriberService.updateOne(
      {
        _id: id
      },
      {
        ...updateSubscriberDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return result
  }

  async remove(id: string, user: UserType) {
    const result = await this.subscriberService.softDelete({ _id: id })
    await this.subscriberService.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return result
  }
}
