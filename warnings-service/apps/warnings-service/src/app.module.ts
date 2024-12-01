import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { WarningsModule } from './warnings/warnings.module';
import { SyncModule } from './sync/sync.module';
import { DbModule } from './db/db.module';
import { UtilsModule } from './utils/utils.module';
import { WorkerClientModule } from './worker-client/worker-client.module';
import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    WarningsModule,
    SyncModule,
    DbModule,
    UtilsModule,
    WorkerClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
}
}
