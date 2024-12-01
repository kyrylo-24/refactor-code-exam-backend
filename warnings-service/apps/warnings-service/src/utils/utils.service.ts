import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { State, StateId } from '../types/state.type';

@Injectable()
export class UtilsService {
  private readonly stateIdMap: Record<StateId, State> = {
    [StateId.IDD]: State.NT,
    [StateId.IDN]: State.NSW,
    [StateId.IDQ]: State.QLD,
    [StateId.IDS]: State.SA,
    [StateId.IDT]: State.TAS,
    [StateId.IDV]: State.VIC,
    [StateId.IDW]: State.WA,
  };

  private readonly amocMap: Record<State, StateId> = {
    [State.NT]: StateId.IDD,
    [State.NSW]: StateId.IDN,
    [State.ACT]: StateId.IDN,
    [State.QLD]: StateId.IDQ,
    [State.SA]: StateId.IDS,
    [State.TAS]: StateId.IDT,
    [State.VIC]: StateId.IDV,
    [State.WA]: StateId.IDW,
  };

  getStateIds(): StateId[] {
    return Object.values(StateId);
  }

  stateIdToAmoc(stateId: StateId): State {
    if (!this.stateIdMap[stateId]) {
      throw new InternalServerErrorException(`State ID ${stateId} not found`);
    }

    return this.stateIdMap[stateId];
  }

  amocToStateId(state: State): StateId {
    if (!this.amocMap[state]) {
      throw new InternalServerErrorException(`State ${state} not found`);
    }

    return this.amocMap[state];
  }
}
