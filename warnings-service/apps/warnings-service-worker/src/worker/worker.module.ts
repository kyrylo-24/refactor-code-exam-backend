import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { FtpModule } from '../ftp/ftp.module';

@Module({
  imports: [FtpModule],
  providers: [WorkerService]
})
export class WorkerModule {}
