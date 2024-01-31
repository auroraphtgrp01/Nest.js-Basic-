import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Role } from '~/roles/schemas/role.schema'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop()
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  age: number

  @Prop()
  gender: string

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId
    name: string
  }

  @Prop()
  address: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  role: mongoose.Schema.Types.ObjectId

  @Prop()
  refresh_token: string

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

export const UserSchema = SchemaFactory.createForClass(User)
