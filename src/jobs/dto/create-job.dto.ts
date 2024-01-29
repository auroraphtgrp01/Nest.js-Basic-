import { Type } from 'class-transformer'
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator'
import mongoose from 'mongoose'

class Company {
  @IsNotEmpty({ message: '_Id company is required' })
  _id: mongoose.Schema.Types.ObjectId

  @IsNotEmpty({ message: 'Name conpany is required' })
  name: string
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsArray({ message: 'Skills must be an array' })
  @IsNotEmpty({ message: 'Skills is required' })
  skills: string[]

  @IsNotEmpty({ message: 'Company is required' })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company

  @IsNotEmpty({ message: 'Location is required' })
  location: string

  @IsNotEmpty({ message: 'Salary is required' })
  salary: number

  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number

  @IsNotEmpty({ message: 'Level is required' })
  level: string

  @IsNotEmpty({ message: 'Description is required' })
  description: string

  @IsNotEmpty({ message: 'StartDate is required' })
  @IsDateString()
  startDate: Date

  @IsDateString()
  @IsNotEmpty({ message: 'EndDate is required' })
  endDate: Date

}
