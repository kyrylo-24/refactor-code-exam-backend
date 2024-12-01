import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';

@Injectable()
export class WarningsService {
  constructor(private readonly apiClientService: ApiClientService) {}

  async getWarnings(stateId: string) {
    if (!stateId) {
      return [];
    }

    const { data } = await this.apiClientService.getWarnings(stateId);
    return data;
  }

  async getWarningDetails(key: string) {
    const { data } = await this.apiClientService.getWarningDetails(key);
    return {
      ...data,
      productType: 'Mixed',
    };
  }
}
