import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { FtpModule } from '../ftp/ftp.module';
import { ServiceClientModule } from '../service-client/service-client.module';

@Module({
  imports: [FtpModule, ServiceClientModule],
  providers: [WorkerService],
})
export class WorkerModule {}
