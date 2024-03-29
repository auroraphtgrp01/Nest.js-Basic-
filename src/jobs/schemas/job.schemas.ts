import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type JobsDocument = HydratedDocument<Job>

@Schema({ timestamps: true })
export class Job {
  @Prop()
  name: string

  @Prop({ required: true })
  skills: string[]

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId
    name: string
  }

  @Prop()
  location: string

  @Prop()
  salary: number

  @Prop()
  quantity: number

  @Prop()
  level: string

  @Prop()
  description: string

  @Prop()
  startDate: Date

  @Prop()
  endDate: Date

  @Prop()
  isActive: boolean

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

export const JobSchema = SchemaFactory.createForClass(Job)
