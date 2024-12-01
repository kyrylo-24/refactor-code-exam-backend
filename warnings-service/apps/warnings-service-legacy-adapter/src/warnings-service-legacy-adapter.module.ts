import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiClientModule } from './api-client/api-client.module';
import { WarningsModule } from './warnings/warnings.module';
import configuration from './config/configuration';
import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware';

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
export class WarningsServiceLegacyAdapterModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
