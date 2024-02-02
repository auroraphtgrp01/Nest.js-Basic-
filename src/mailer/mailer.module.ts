import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { MailerController } from './mailer.controller'
import { ConfigService } from '@nestjs/config'
import { MailerModule as Mailer } from '@nestjs-modules/mailer'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MongooseModule } from '@nestjs/mongoose'
import { Job, JobSchema } from '~/jobs/schemas/job.schemas'
import { Subscriber, SubscriberSchema } from '~/subscribers/schemas/subscriber.schema'

@Module({
  imports: [
    Mailer.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_AUTH_USER'),
            pass: configService.get<string>('EMAIL_AUTH_PASSWORD')
          }
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      {
        name: Job.name,
        schema: JobSchema
      },
      {
        name: Subscriber.name,
        schema: SubscriberSchema
      }
    ])
  ],
  controllers: [MailerController],
  providers: [MailerService]
})
export class MailerModule {}
