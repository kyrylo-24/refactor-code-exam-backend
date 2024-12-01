import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiClientService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = configService.get('app.api.url');

    if (!this.apiUrl) {
      throw new Error('API URL is not set');
    }
  }

  async getWarnings(stateId: string) {
    return await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/warnings`, {
        params: {
          state: stateId,
        },
      }),
    );
  }

  async getWarningDetails(key: string) {
    return await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/warnings/${key}`),
    );
  }
}
