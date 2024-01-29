import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { ResumeStatus } from '~/constant/status'

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

  @Prop()
  companyID: mongoose.Types.ObjectId

  @Prop()
  jobID: mongoose.Types.ObjectId

  @Prop()
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
