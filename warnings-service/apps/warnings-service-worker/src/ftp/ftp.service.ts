import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'basic-ftp';
import { createPool, Pool } from 'generic-pool';
import * as fs from 'fs/promises';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class FtpService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool<Client>;
  private readonly logger = new Logger(FtpService.name);
  private readonly BASE_PATH = '/anon/gen/fwo/';

  constructor(
    private configService: ConfigService,
    private utilsService: UtilsService,
  ) {}

  async onModuleInit() {
    const config = this.configService.get('app.ftp');

    this.pool = createPool(
      {
        create: async () => {
          const client = new Client();
          await client.access({
            host: config.host,
            secure: config.secure,
          });
          return client;
        },
        destroy: (client) => {
          return Promise.resolve(client.close());
        },
      },
      {
        max: config.poolSize,
        min: 1,
      },
    );
  }

  async onModuleDestroy() {
    await this.pool.drain();
    await this.pool.clear();
  }

  async getWarnings(): Promise<string[]> {
    const client = await this.pool.acquire();
    try {
      await client.cd(this.BASE_PATH);
      const files = await client.list();
      return files
        .filter((f) => f.name.endsWith('.amoc.xml'))
        .map((f) => f.name);
    } catch (error) {
      this.logger.error('Failed to get warnings', error);
      throw new InternalServerErrorException('Failed to get warnings');
    } finally {
      await this.pool.release(client);
    }
  }

  async downloadWarning(key: string): Promise<string> {
    const xmlFileName = this.utilsService.getWarningFile(key);
    const localXmlPath = `/tmp/${xmlFileName}`;

    try {
      const client = await this.pool.acquire();

      try {
        await client.cd(this.BASE_PATH);
        await client.download(localXmlPath, xmlFileName);

        const data = await fs.readFile(localXmlPath, { encoding: 'utf-8' });
        return data;
      } finally {
        await this.pool.release(client);
        await this.cleanupFile(localXmlPath);
      }
    } catch (error) {
      this.logger.error(`Failed to download warning ${key}`, error);
      throw new BadRequestException(`Failed to download warning ${key}`);
    }
  }

  async downloadWarningText(key: string): Promise<string> {
    const textFileName = `${key}.txt`;
    const localTextPath = `/tmp/${textFileName}`;

    try {
      const client = await this.pool.acquire();

      try {
        await client.cd(this.BASE_PATH);
        await client.download(localTextPath, textFileName);

        const data = await fs.readFile(localTextPath, { encoding: 'utf-8' });
        return data;
      } finally {
        await this.pool.release(client);
        await this.cleanupFile(localTextPath);
      }
    } catch (error) {
      this.logger.error(`Failed to download warning text ${key}`, error);
      throw new BadRequestException(`Failed to download warning text ${key}`);
    }
  }

  private async cleanupFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      this.logger.warn(`Failed to cleanup file ${filePath}`, error);
      throw new InternalServerErrorException(
        `Failed to cleanup file ${filePath}`,
      );
    }
  }
}
