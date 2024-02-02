import { Controller, Get } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { Public, ResponseMessage } from '~/decorator/customize'
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  @Public()
  @ResponseMessage('Handle Send Email')
  async handleTestEmail() {
    return await this.mailerService.handleSendEmail()
  }
}
