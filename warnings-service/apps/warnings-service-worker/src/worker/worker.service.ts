import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FtpService } from '../ftp/ftp.service';
import { UtilsService } from '../utils/utils.service';
import { ServiceClientService } from '../service-client/service-client.service';

@Injectable()
export class WorkerService {
  private processedWarnings = new Set<string>();

  private readonly logger = new Logger(WorkerService.name);

  constructor(
    private readonly ftpService: FtpService,
    private readonly utilsService: UtilsService,
    private readonly serviceClient: ServiceClientService,
  ) {}

//   @Cron(CronExpression.EVERY_30_SECONDS)
  @Cron(CronExpression.EVERY_10_HOURS)
  async processWarnings() {
    this.logger.log('Processing warnings');
    const warnings = await this.ftpService.getWarnings();

    this.logger.log(`Found ${warnings.length} warnings`);
    this.logger.log(`Saving warnings to service`);

    await this.serviceClient.saveWarnings(warnings);

    this.logger.log(`Saving warnings to service completed`);

    for (const warningKey of warnings) {
      try {
        const cleanWarningKey = this.utilsService.cleanWarningKey(warningKey);

        if (this.processedWarnings.has(cleanWarningKey)) {
          this.logger.log(`Warning ${cleanWarningKey} already processed`);
          continue;
        }

        this.logger.log(`Processing warning ${cleanWarningKey}`);

        const warning = await this.ftpService.downloadWarning(cleanWarningKey);
        const warningText =
          await this.ftpService.downloadWarningText(cleanWarningKey);

        // TODO: make call to warnings-service to save warning and warning text

        this.processedWarnings.add(cleanWarningKey);

        this.logger.log(`Processed warning ${cleanWarningKey}`);
      } catch (error) {
        this.logger.error(`Failed to process warning ${warningKey}`, error);
      }
    }
  }
}
