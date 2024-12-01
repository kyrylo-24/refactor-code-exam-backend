import { Injectable, Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { State } from '../types/state.type';
import { DbService } from '../db/db.service';
import { WorkerClientService } from '../worker-client/worker-client.service';
import { WarningDetails } from '../types/warning.type';
import { WarningsParserService } from './warnings-parser.service';

@Injectable()
export class WarningsService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly dbService: DbService,
    private readonly workerClientService: WorkerClientService,
    private readonly warningsParserService: WarningsParserService,
  ) {}

  private readonly logger = new Logger(WarningsService.name);

  async getWarnings(state: State): Promise<string[]> {
    const stateId = this.utilsService.amocToStateId(state);

    let warnings = this.dbService.getWarnings(stateId);

    if (!warnings) {
      this.logger.log(`No warnings found for state ${state}`);
      warnings = await this.workerClientService.getWarnings();
      this.saveWarnings(warnings);
      warnings = this.dbService.getWarnings(stateId);
    }

    return warnings;
  }

  async getWarningDetails(key: string): Promise<WarningDetails> {
    let warningDetails = this.dbService.getWarningDetails(key);

    if (!warningDetails) {
      warningDetails = await this.fetchWarningDetails(key);
      this.dbService.setWarningDetails(key, warningDetails);
    }

    return warningDetails;
  }

  private async fetchWarningDetails(key: string): Promise<WarningDetails> {
    const warning = await this.workerClientService.getWarning(key);
    const text = await this.workerClientService.getWarningText(key);

    const details = this.warningsParserService.parseWarning(warning);

    return {
      ...details,
      text,
    };
  }

  saveWarnings(warnings: string[]) {
    const stateIds = this.utilsService.getStateIds();

    for (const stateId of stateIds) {
      const warningsForState = warnings
        .filter((warning) => warning.startsWith(stateId))
        .map((warning) => warning.replace(/\.amoc\.xml/, ''));

      this.dbService.setWarnings(stateId, warningsForState);
    }
  }
}
