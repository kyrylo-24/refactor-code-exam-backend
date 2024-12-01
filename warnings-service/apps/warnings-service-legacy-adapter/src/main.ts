import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WarningsServiceLegacyAdapterModule } from './warnings-service-legacy-adapter.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('WarningsServiceLegacyAdapter');

  const app = await NestFactory.create(WarningsServiceLegacyAdapterModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get('app.port');
  await app.listen(port, () => {
    logger.log(`Server listening on port ${port}`);
  });
}
bootstrap();
