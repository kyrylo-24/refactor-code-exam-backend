import { Controller, Param, Get, Query } from '@nestjs/common';
import { WarningsService } from './warnings.service';
import { GetWarningsQueryDto } from './dto/get-warnings-query.dto';

@Controller('warnings')
export class WarningsController {
  constructor(private readonly warningsService: WarningsService) {}

  @Get()
  getWarnings(@Query() query: GetWarningsQueryDto) {
    return this.warningsService.getWarnings(query.state);
  }

  @Get(':key')
  getWarningDetails(@Param('key') key: string) {
    return this.warningsService.getWarningDetails(key);
  }
}
