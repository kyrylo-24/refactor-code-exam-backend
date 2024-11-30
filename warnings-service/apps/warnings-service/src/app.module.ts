import { Module } from '@nestjs/common';
import { WarningsModule } from './warnings/warnings.module';
import { SyncModule } from './sync/sync.module';
import { DbModule } from './db/db.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [WarningsModule, SyncModule, DbModule, UtilsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
