import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, }))

  const config = new DocumentBuilder()
  .setTitle('RST')
  .setDescription('Prueba técnica')
  .setVersion('2.0')
  .addBearerAuth()
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicacion corriendo en el puerto ${process.env.PORT ?? 3000}`);


}
bootstrap();
