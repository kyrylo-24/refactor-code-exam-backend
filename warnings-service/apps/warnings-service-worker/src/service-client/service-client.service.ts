import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class ServiceClientService {
  private readonly serviceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceUrl = configService.get('app.service.url');

    if (!this.serviceUrl) {
      throw new Error('Service URL is not set');
    }
  }

  async saveWarnings(warnings: string[]) {
    return await lastValueFrom(
      this.httpService.post(`${this.serviceUrl}/sync/warnings`, {
        warnings,
      }),
    );
  }
}
