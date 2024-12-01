import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class StateMapperPipe implements PipeTransform {
  private legacyStateIdMap = {
    NT: "NT",
    NSW: "NSW", 
    Qld: "QLD",
    SA: "SA",
    Tas: "TAS",
    Vic: "VIC",
    WA: "WA",
    ACT: "ACT"
  }

  transform(value: string) {
    return this.legacyStateIdMap[value];
  }
}
