import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SubcribersDocument = HydratedDocument<Subscriber>

@Schema()
export class Subscriber {
  @Prop()
  email: string

  @Prop()
  name: string

  @Prop({ type: [String] })
  skills: string[]

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

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber)
