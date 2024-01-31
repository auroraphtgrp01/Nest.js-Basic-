import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Company } from '~/companies/schemas/company.schema'
import { ResumeStatus } from '~/constant/status'
import { Job } from '~/jobs/schemas/job.schemas'

export type ResumeDocument = HydratedDocument<Resume>
export interface HistoryResume {
  status: string
  updatedAt: Date
  updatedBy: {
    _id: mongoose.Types.ObjectId
    email: string
  }
}

@Schema({ timestamps: true, collection: 'resumes' })
export class Resume {
  @Prop()
  email: string

  @Prop()
  userID: mongoose.Types.ObjectId

  @Prop()
  url: string

  @Prop()
  status: ResumeStatus

  @Prop({ type: mongoose.Types.ObjectId, ref: Company.name })
  companyID: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Types.ObjectId, ref: Job.name })
  jobID: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.Array })
  history: HistoryResume[]

  @Prop()
  updated_at: Date

  @Prop()
  created_at: Date

  @Prop()
  deletedAt: Date

  @Prop()
  isDeleted: boolean

  @Prop({ type: Object })
  createdBy: {
    _id: string
    email: string
  }

  @Prop({ type: Object })
  updatedBy: {
    _id: string
    email: string
  }

  @Prop({ type: Object })
  deletedBy: {
    _id: string
    email: string
  }
}

export const ResumeSchema = SchemaFactory.createForClass(Resume)
