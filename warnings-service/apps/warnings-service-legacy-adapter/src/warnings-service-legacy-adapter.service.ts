import { Injectable } from '@nestjs/common';

@Injectable()
export class WarningsServiceLegacyAdapterService {
  getHello(): string {
    return 'Hello World!';
  }
}
