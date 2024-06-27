import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable cors for all origins and methods
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  const PORT = process.env.PORT || 8080;
  app.use(graphqlUploadExpress());
  await app.listen(PORT);
  console.log(`server is running on port  ${PORT}`);
}

bootstrap();
