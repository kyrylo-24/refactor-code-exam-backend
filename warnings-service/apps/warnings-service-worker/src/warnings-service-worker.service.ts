import { Injectable } from '@nestjs/common';

@Injectable()
export class WarningsServiceWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
