import { Injectable } from '@nestjs/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type PermissionDocument = HydratedDocument<Permission>

@Schema({ timestamps: true })
export class Permission {
  @Prop()
  name: string

  @Prop()
  apiPath: string

  @Prop()
  method: string

  @Prop()
  module: string

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

export const PermissionSchema = SchemaFactory.createForClass(Permission)
