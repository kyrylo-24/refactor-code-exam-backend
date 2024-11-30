import { Controller, Get } from '@nestjs/common';
import { WarningsServiceWorkerService } from './warnings-service-worker.service';

@Controller()
export class WarningsServiceWorkerController {
  constructor(private readonly warningsServiceWorkerService: WarningsServiceWorkerService) {}

  @Get()
  getHello(): string {
    return this.warningsServiceWorkerService.getHello();
  }
}
