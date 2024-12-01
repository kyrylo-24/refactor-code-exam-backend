import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WorkerClientService {
  private readonly workerUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const workerUrl = configService.get('app.worker.url');

    console.log('workerUrl', workerUrl);

    if (!workerUrl) {
      throw new Error('Worker URL is not set');
    }

    this.workerUrl = workerUrl;
  }

  async getWarnings() {
    const { data } = await lastValueFrom(
      this.httpService.get<string[]>(`${this.workerUrl}/ftp/warnings`),
    );

    return data;
  }

  async getWarning(key: string) {
    const { data } = await lastValueFrom(
      this.httpService.get<string>(`${this.workerUrl}/ftp/warnings/${key}`),
    );

    return data;
  }

  async getWarningText(key: string) {
    const { data } = await lastValueFrom(
      this.httpService.get<string>(
        `${this.workerUrl}/ftp/warnings/${key}/text`,
      ),
    );

    return data;
  }
}
