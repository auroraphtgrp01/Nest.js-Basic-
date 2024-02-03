import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { TransformInterceptor } from './core/transform.interceptor'
import { ErrorHandlerInterceptor } from './core/errorhandler.interceptor'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import { ParseObjectIDPipe } from './pipe/customize'
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ErrorHandlerInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  app.useGlobalPipes(new ParseObjectIDPipe())
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  })
  app.use(cookieParser())
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true
  })
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('NestJS APIs Documentation')
    .setDescription('NestJS APIs Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000)
}
bootstrap()
