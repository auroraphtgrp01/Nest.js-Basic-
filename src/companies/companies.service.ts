import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { Company, CompanyDocument } from './schemas/company.schema'
import { InjectModel } from '@nestjs/mongoose'
import { UserType } from '~/interface/user.interface'

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private readonly companiesModel: SoftDeleteModel<CompanyDocument>) {}
  createCompany(createCompanyDto: CreateCompanyDto, user: UserType) {
    const result = this.companiesModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return result
  }

  findAll() {
    return `This action returns all companies`
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`
  }

  remove(id: number) {
    return `This action removes a #${id} company`
  }
}