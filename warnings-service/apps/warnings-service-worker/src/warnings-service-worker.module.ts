import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { FtpModule } from './ftp/ftp.module';
import { WorkerModule } from './worker/worker.module';
import { UtilsModule } from './utils/utils.module';
import { ServiceClientModule } from './service-client/service-client.module';
import configuration from './config/configuration';
import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    FtpModule,
    WorkerModule,
    UtilsModule,
    ServiceClientModule,
  ],
  controllers: [],
  providers: [],
})
export class WarningsServiceWorkerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
