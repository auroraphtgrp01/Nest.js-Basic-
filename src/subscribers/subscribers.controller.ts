import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { SubscribersService } from './subscribers.service'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'
import { UpdateSubscriberDto } from './dto/update-subscriber.dto'
import { ResponseMessage, User } from '~/decorator/customize'
import { UserType } from '~/interface/user.interface'

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}
  /*
   * @Route: /subscribers
   * @Method: POST
   * @Access: JWT
   * @Desc: Create a new subscriber
   */
  @ResponseMessage('This action adds a new subscriber')
  @Post()
  async create(@Body() createSubscriberDto: CreateSubscriberDto, @User() user: UserType) {
    return await this.subscribersService.create(createSubscriberDto, user)
  }
  /*
   * @Route: /subscribers
   * @Method: GET
   * @Access: JWT
   * @Desc: Get all subscribers with pagination
   */
  @ResponseMessage('This action returns all subscribers')
  @Get()
  findAll(@Query() queryString: string) {
    return this.subscribersService.findAll(queryString)
  }
  /*
   * @Route: /subscribers/:id
   * @Method: GET
   * @Access: JWT
   * @Desc: Get subscribers with id
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subscribersService.findOne(id)
  }
  /*
   * @Route: /subscribers/:id
   * @Method: PATCH
   * @Access: JWT
   * @Desc: Update subscribers with id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriberDto: UpdateSubscriberDto, @User() user: UserType) {
    return this.subscribersService.update(id, updateSubscriberDto, user)
  }
  /*
   * @Route: /subscribers/:id
   * @Method: DELETE
   * @Access: JWT
   * @Desc: Remove subscribers with id
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserType) {
    return await this.subscribersService.remove(id, user)
  }
}
