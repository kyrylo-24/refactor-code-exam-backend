import { Module } from '@nestjs/common';
import { WarningsController } from './warnings.controller';
import { WarningsService } from './warnings.service';
import { WarningsParserService } from './warnings-parser.service';
import { WorkerClientModule } from '../worker-client/worker-client.module';

@Module({
  controllers: [WarningsController],
  providers: [WarningsService, WarningsParserService],
  imports: [WorkerClientModule],
})
export class WarningsModule {}
