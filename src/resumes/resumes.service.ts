import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { Resume, ResumeDocument } from './schemas/resume.schema'
import { UserType } from '~/interface/user.interface'
import { ResumeStatus } from '~/constant/status'
import { PaginationQuery } from '~/utils/pagination_query.utils'
import mongoose from 'mongoose'
import { validateObjectID } from '~/utils/validation.utils'

@Injectable()
export class ResumesService {
  constructor(@InjectModel(Resume.name) private readonly resumeModel: SoftDeleteModel<ResumeDocument>) {}
  async create(createResumeDto: CreateResumeDto, user: UserType) {
    const result = await this.resumeModel.create({
      ...createResumeDto,
      userID: user._id,
      createdBy: {
        _id: user._id,
        email: user.email
      },
      status: ResumeStatus.PENDING,
      history: [
        {
          status: ResumeStatus.PENDING,
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      ]
    })
    return result
  }

  async findAll(queryString: string) {
    const result = await PaginationQuery(queryString, this.resumeModel)
    return result
  }

  findOne(id: string) {
    validateObjectID(id)
    const result = this.resumeModel.findOne({ _id: id })
    return result
  }

  async updateStatus(id: string, status: ResumeStatus, user: UserType) {
    if (!status || status in ResumeStatus === false) {
      throw new UnauthorizedException('Status Is Invalid')
    }
    validateObjectID(id)
    const result = await this.resumeModel.updateOne(
      { _id: id },
      {
        status: status,
        updatedBy: {
          _id: user._id,
          email: user.email
        },
        $push: {
          history: {
            status: status,
            updatedAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email
            }
          }
        }
      }
    )
    return result
  }

  async remove(id: string, user: UserType) {
    validateObjectID(id)
    const result = await this.resumeModel.softDelete({
      _id: id
    })
    await this.resumeModel.updateOne(
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
  async getCV(userID: string) {
    return await this.resumeModel.find({ userID: userID })
  }
}
