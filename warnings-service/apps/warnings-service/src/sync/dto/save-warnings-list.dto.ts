import { IsArray, IsString } from 'class-validator';

export class SaveWarningsListDto {
  @IsArray()
  @IsString({ each: true })
  warnings: string[];
}
