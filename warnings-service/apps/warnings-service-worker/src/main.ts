import { NestFactory } from '@nestjs/core';
import { WarningsServiceWorkerModule } from './warnings-service-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(WarningsServiceWorkerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
