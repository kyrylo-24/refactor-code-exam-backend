import { Controller, Get, Param, Query } from '@nestjs/common';
import { WarningsService } from './warnings.service';
import { StateMapperPipe } from './pipes/state-mapper.pipe';

@Controller('')
export class WarningsController {
  constructor(private readonly warningsService: WarningsService) {}

  @Get()
  getWarnings(@Query('state', StateMapperPipe) state: string) {
    return this.warningsService.getWarnings(state);
  }

  @Get('/warning/:id')
  getWarning(@Param('id') id: string) {
    return this.warningsService.getWarningDetails(id);
  }
}
