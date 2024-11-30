import { Module } from '@nestjs/common';
import { WarningsServiceWorkerController } from './warnings-service-worker.controller';
import { WarningsServiceWorkerService } from './warnings-service-worker.service';

@Module({
  imports: [],
  controllers: [WarningsServiceWorkerController],
  providers: [WarningsServiceWorkerService],
})
export class WarningsServiceWorkerModule {}
