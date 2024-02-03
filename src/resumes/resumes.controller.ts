import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes } from '@nestjs/common'
import { ResumesService } from './resumes.service'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { ResponseMessage, User } from '~/decorator/customize'
import { UserType } from '~/interface/user.interface'
import { ResumeStatus } from '~/constant/status'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }
  /*
   * @Method: POST
   * @Route : /resumes
   * @Description: Create a new resume
   * @Public: false
   */
  @ResponseMessage('Create a new resume')
  @Post()
  async create(@Body() createResumeDto: CreateResumeDto, @User() user: UserType) {
    return await this.resumesService.create(createResumeDto, user)
  }
  /*
   * @Method: GET
   * @Route : /resumes
   * @Description: Get all resumes
   * @Public: false
   */
  @ResponseMessage('Get all resumes')
  @Get()
  async findAll(@Query() queryString: string) {
    return this.resumesService.findAll(queryString)
  }
  /*
   * @Method: GET
   * @Route : /resumes/:id
   * @Description: Get resume by id
   * @Public: false
   */
  @ResponseMessage('Get resume by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id)
  }
  /*
   * @Method: PATCH
   * @Route : /resumes/:id
   * @Description: Change Status of resume
   * @Public: false
   */
  @ResponseMessage('Change Status of resume')
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body('status') status: ResumeStatus, @User() user: UserType) {
    return this.resumesService.updateStatus(id, status, user)
  }
  /*
   * @Method: DELETE
   * @Route : /resumes/:id
   * @Description: delete resume by id
   * @Public: false
   */
  @ResponseMessage('Delete Resume by ID')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    return this.resumesService.remove(id, user)
  }
  /*
   * @Method: POST
   * @Route : /resumes/by-user
   * @Description: Get CV by User
   * @Public: false
   */
  @ResponseMessage('Get CV by User')
  @Post('by-user')
  getCV(@User() user: UserType) {
    return this.resumesService.getCV(user._id)
  }
}
