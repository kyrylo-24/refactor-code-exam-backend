import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WorkerClientService } from './worker-client.service';

@Module({
  imports: [HttpModule],
  providers: [WorkerClientService],
  exports: [WorkerClientService],
})
export class WorkerClientModule {}
