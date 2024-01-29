import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { CreateJobDto } from './dto/create-job.dto'
import { UpdateJobDto } from './dto/update-job.dto'
import { ResponseMessage, User } from '~/decorator/customize'
import { UserType } from '~/interface/user.interface'

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  /*
   * @Route: /jobs
   * @Method: POST
   * @Access: JWT
   * @Desc: Create Job
   */
  @ResponseMessage('Create a new Job')
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto)
  }
  /*
   * @Route: /jobs
   * @Method: GET
   * @Access: Public
   * @Desc: Get All Jobs
   */
  @ResponseMessage('Get all Jobs')
  @Get()
  findAll(@User() user: UserType, @Query() queryString: string) {
    return this.jobsService.findAll(user, queryString)
  }
  /*
   * @Route: /jobs/:id
   * @Method: GET
   * @Access: Public
   * @Desc: Get Job By Id
   */
  @ResponseMessage('Get a Job by Id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id)
  }
  /*
   * @Route: /jobs/:id
   * @Method: PATCH
   * @Access: JWT
   * @Desc: Update Job
   */
  @ResponseMessage('Update a Job')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: UserType) {
    return this.jobsService.update(id, updateJobDto, user)
  }
  /*
   * @Route: /jobs/:id
   * @Method: DELETE
   * @Access: JWT
   * @Desc: Delete Job
   */
  @ResponseMessage('Delete a Job')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserType) {
    return this.jobsService.remove(id, user)
  }
}
