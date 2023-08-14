import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors(corsOptions);
  await app.listen(3007);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
