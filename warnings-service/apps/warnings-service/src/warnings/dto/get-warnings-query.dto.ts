import { IsEnum, IsOptional, IsString } from 'class-validator';
import { State } from '../../types/state.type';

export class GetWarningsQueryDto {
  @IsString()
  @IsEnum(State)
  state?: State;
}
