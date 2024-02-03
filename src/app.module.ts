import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './Users/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
// import { APP_GUARD } from '@nestjs/core'
// import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { CompaniesModule } from './companies/companies.module'
import { JobsModule } from './jobs/jobs.module'
import { FilesModule } from './files/files.module'
import { ResumesModule } from './resumes/resumes.module'
import { PermissionModule } from './permission/permission.module'
import { RolesModule } from './roles/roles.module'
import { DatabasesModule } from './databases/databases.module'
import { SubscribersModule } from './subscribers/subscribers.module'
import { MailerModule } from './mailer/mailer.module'
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 2
    }]),
    ScheduleModule.forRoot(),
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin)
          return connection
        }
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    CompaniesModule,
    JobsModule,
    FilesModule,
    ResumesModule,
    PermissionModule,
    RolesModule,
    DatabasesModule,
    SubscribersModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }
