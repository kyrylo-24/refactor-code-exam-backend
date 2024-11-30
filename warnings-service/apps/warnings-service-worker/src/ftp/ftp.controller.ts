import { Controller, Get, Param } from '@nestjs/common';
import { FtpService } from './ftp.service';

@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Get('warnings')
  async getWarnings() {
    return this.ftpService.getWarnings();
  }

  @Get('warnings/:key')
  async getWarning(@Param('key') key: string) {
    return this.ftpService.downloadWarning(key);
  }

  @Get('warnings/:key/text') 
  async getWarningText(@Param('key') key: string) {
    return this.ftpService.downloadWarningText(key);
  }
}
