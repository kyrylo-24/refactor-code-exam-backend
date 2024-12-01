import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { DbService } from '../db/db.service';
import { WarningsParserService } from '../warnings/warnings-parser.service';
import { WarningsModule } from '../warnings/warnings.module';

@Module({
  imports: [WarningsModule],
  controllers: [SyncController],
  providers: [SyncService, DbService, WarningsParserService],
})
export class SyncModule {}
