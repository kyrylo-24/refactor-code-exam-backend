import { Injectable } from '@nestjs/common';
import { StateId } from '../types/state.type';
import { WarningDetails } from '../types/warning.type';

@Injectable()
export class DbService {
  private warnings: Map<StateId, string[]> = new Map();
  private warningDetails: Map<string, WarningDetails> = new Map();

  getWarnings(stateId: StateId) {
    return this.warnings.get(stateId);
  }

  setWarnings(stateId: StateId, warnings: string[]) {
    this.warnings.set(stateId, warnings);
  }

  getWarningDetails(warningId: string) {
    return this.warningDetails.get(warningId);
  }

  setWarningDetails(warningId: string, warningDetails: WarningDetails) {
    this.warningDetails.set(warningId, warningDetails);
  }
}
