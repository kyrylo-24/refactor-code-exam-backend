import { Module } from '@nestjs/common';
import { WarningsServiceLegacyAdapterController } from './warnings-service-legacy-adapter.controller';
import { WarningsServiceLegacyAdapterService } from './warnings-service-legacy-adapter.service';

@Module({
  imports: [],
  controllers: [WarningsServiceLegacyAdapterController],
  providers: [WarningsServiceLegacyAdapterService],
})
export class WarningsServiceLegacyAdapterModule {}
