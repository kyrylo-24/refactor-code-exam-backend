import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { WarningsModule } from './warnings/warnings.module';
import { SyncModule } from './sync/sync.module';
import { DbModule } from './db/db.module';
import { UtilsModule } from './utils/utils.module';
import { WorkerClientModule } from './worker-client/worker-client.module';

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
export class AppModule {}
