import { PartialType } from '@nestjs/mapped-types'
import { CreateCompanyDto } from './create-company.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateCompanyDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsNotEmpty({ message: 'Address is required' })
  address: string

  @IsNotEmpty({ message: 'Description is required' })
  description: string

  @IsNotEmpty({ message: 'Logo is required' })
  logo: string
}
