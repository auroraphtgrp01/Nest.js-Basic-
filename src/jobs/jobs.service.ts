import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateJobDto } from './dto/create-job.dto'
import { UpdateJobDto } from './dto/update-job.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Job, JobsDocument } from './schemas/job.schemas'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { UserType } from '~/interface/user.interface'
import { PaginationQuery } from '~/utils/pagination_query.utils'

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private readonly jobModel: SoftDeleteModel<JobsDocument>) {}
  async create(createJobDto: CreateJobDto) {
    const result = await this.jobModel.create(createJobDto)
    return result
  }

  findAll(user: UserType, queryString: string) {
    const paginationResult = PaginationQuery(queryString, this.jobModel)
    return paginationResult
  }
  async findOne(id: string) {
    const result = await this.jobModel.findById(id)
    if (!result) throw new NotFoundException('Job not found')
    return result
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: UserType) {
    const result = await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          id: user._id,
          email: user.email
        }
      }
    )
    return result
  }

  async remove(id: string, user: UserType) {
    const result = await this.jobModel.softDelete({ _id: id })
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          id: user._id,
          email: user.email
        }
      }
    )
    return result
  }
}
