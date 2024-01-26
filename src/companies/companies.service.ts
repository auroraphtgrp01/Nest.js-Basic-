import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { Company, CompanyDocument } from './schemas/company.schema'
import { InjectModel } from '@nestjs/mongoose'
import { UserType } from '~/interface/user.interface'
import aqp from 'api-query-params'

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

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs)
    delete filter.page
    delete filter.limit
    console.log(filter)

    const offset = (currentPage - 1) * limit
    const defaultLimit = limit ? limit : 10
    const totalItem = (await this.companiesModel.find(filter)).length
    const totalPage = Math.ceil(totalItem / defaultLimit)
    const result = await this.companiesModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec()
    return {
      meta: {
        currentPage: currentPage,
        pageSize: limit,
        pages: totalPage,
        total: totalItem
      },
      result
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto, user: UserType) {
    const result = this.companiesModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return result
  }

  async remove(id: string, user: UserType) {
    await this.companiesModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    const result = this.companiesModel.softDelete({ _id: id })
    return result
  }
}
