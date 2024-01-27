import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Version } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { UserType } from '~/interface/user.interface'
import { ResponseMessage, User } from '~/decorator/customize'
import mongoose from 'mongoose'
import { HTTP_STATUS } from '~/constant/HTTP_STATUS'
@Controller({
  path: 'companies',
  version: ['1', '2']
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: UserType) {
    return this.companiesService.createCompany(createCompanyDto, user)
  }
  @ResponseMessage('Fetch List Company !')
  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string, @Query() qs: string) {
    return this.companiesService.findAll(+page, +limit, qs)
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id)
  }
  @ResponseMessage('Update Company !')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: UserType) {
    if (!mongoose.isValidObjectId(id)) {
      return new HttpException('Invalid company id', HTTP_STATUS.NOT_FOUND)
    }
    return this.companiesService.update(id, updateCompanyDto, user)
  }
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    if (!mongoose.isValidObjectId(id)) {
      return new HttpException('Invalid company id', HTTP_STATUS.NOT_FOUND)
    }
    return this.companiesService.remove(id, user)
  }
}
