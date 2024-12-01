import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SaveWarningsListDto } from './dto/save-warnings-list.dto';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('warnings')
  @HttpCode(200)
  async saveWarningsList(@Body() saveWarningsListDto: SaveWarningsListDto) {
    return this.syncService.saveWarningsList(saveWarningsListDto);
  }
}
