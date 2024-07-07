import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const appPort = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort);

  console.log(`Server running on http://localhost:${appPort}`);
}

bootstrap();
