import { Injectable } from '@nestjs/common'
import { MailerService as MailerS } from '@nestjs-modules/mailer'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { Job, JobsDocument } from '~/jobs/schemas/job.schemas'
import { SubcribersDocument } from '~/subscribers/schemas/subscriber.schema'
import { Subscriber } from 'rxjs'
import { IMailSender } from '~/interface/user.interface'

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerServices: MailerS,

    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobsDocument>,

    @InjectModel(Subscriber.name)
    private readonly subscriberModel: SoftDeleteModel<SubcribersDocument>
  ) {}
  async handleSendEmail() {
    const mailSender: IMailSender[] = []
    const subcribers = await this.subscriberModel.find({})
    for (const subc of subcribers) {
      mailSender.push({
        to: subc.email,
        name: subc.name,
        jobs: []
      })
      const jobMatchingWithSkills = await this.jobModel.find({ skills: { $in: subc.skills } })
      for (const item of jobMatchingWithSkills) {
        mailSender[mailSender.length - 1].jobs.push({
          name: item.name,
          company: item.company.name,
          salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND',
          skills: item.skills
        })
      }
    }

    mailSender.forEach(async (item) => {
      await this.mailerServices.sendMail({
        to: item.to,
        from: 'Auroraphtgrp CV', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'job',
        context: {
          receiver: item.name,
          jobs: item.jobs
        }
      })
    })
  }
}
