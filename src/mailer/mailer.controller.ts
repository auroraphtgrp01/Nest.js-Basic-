import { Controller, Get } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { Public, ResponseMessage } from '~/decorator/customize'
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) { }

  @Get()
  @Public()
  // @Cron(CronExpression.EVERY_10_SECONDS)
  @ResponseMessage('Handle Send Email')
  async handleTestEmail() {
    return await this.mailerService.handleSendEmail()
  }
}
