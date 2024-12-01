import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WarningsServiceWorkerModule } from './warnings-service-worker.module';

async function bootstrap() {
  const logger = new Logger('WarningsServiceWorker');

  const app = await NestFactory.create(WarningsServiceWorkerModule);
  const configService = app.get(ConfigService);

  const port = configService.get('app.port');
  await app.listen(port, () => {
    logger.log(`Worker listening on port ${port}`);
  });
}
bootstrap();
