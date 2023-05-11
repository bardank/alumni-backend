import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8080;
  app.use(graphqlUploadExpress());
  await app.listen(PORT);
  console.log(`server is running on port  ${PORT}`);
}

bootstrap();
