import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { TransformInterceptor } from './core/transform.interceptor'
import { ErrorHandlerInterceptor } from './core/errorhandler.interceptor'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ErrorHandlerInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  })
  app.use(cookieParser())
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })
  await app.listen(3000)
}
bootstrap()
