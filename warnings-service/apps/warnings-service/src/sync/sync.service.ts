import { Injectable } from '@nestjs/common';
import { SaveWarningsListDto } from './dto/save-warnings-list.dto';
import { WarningsService } from '../warnings/warnings.service';

@Injectable()
export class SyncService {
  constructor(private readonly warningsService: WarningsService) {}

  saveWarningsList(saveWarningsListDto: SaveWarningsListDto) {
    this.warningsService.saveWarnings(saveWarningsListDto.warnings);
  }
}
