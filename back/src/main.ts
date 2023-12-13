import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`, 'trusted-cdn.com'],
        },
      },
      xssFilter: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Starter Project Nest.Js')
    .setDescription(
      'API Rest avec TypeORM, Authentification JWT et implémentation de SWAGGER',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
