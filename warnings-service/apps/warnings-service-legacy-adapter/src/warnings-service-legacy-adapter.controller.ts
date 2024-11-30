import { Controller, Get } from '@nestjs/common';
import { WarningsServiceLegacyAdapterService } from './warnings-service-legacy-adapter.service';

@Controller()
export class WarningsServiceLegacyAdapterController {
  constructor(private readonly warningsServiceLegacyAdapterService: WarningsServiceLegacyAdapterService) {}

  @Get()
  getHello(): string {
    return this.warningsServiceLegacyAdapterService.getHello();
  }
}
