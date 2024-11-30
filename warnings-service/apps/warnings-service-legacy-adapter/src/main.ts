import { NestFactory } from '@nestjs/core';
import { WarningsServiceLegacyAdapterModule } from './warnings-service-legacy-adapter.module';

async function bootstrap() {
  const app = await NestFactory.create(WarningsServiceLegacyAdapterModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
