import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiClientModule } from './api-client/api-client.module';
import { WarningsModule } from './warnings/warnings.module';
import configuration from './config/configuration';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ApiClientModule,
    WarningsModule,
  ],
})
export class WarningsServiceLegacyAdapterModule {}
