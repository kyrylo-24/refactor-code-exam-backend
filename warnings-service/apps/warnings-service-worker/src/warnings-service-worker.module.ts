import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { FtpModule } from './ftp/ftp.module';
import { WorkerModule } from './worker/worker.module';
import { UtilsModule } from './utils/utils.module';
import configuration from './config/configuration';

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
  ],
  controllers: [],
  providers: [],
})
export class WarningsServiceWorkerModule {}
