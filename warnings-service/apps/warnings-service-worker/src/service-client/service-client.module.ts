import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServiceClientService } from './service-client.service';

@Module({
  imports: [HttpModule],
  providers: [ServiceClientService],
  exports: [ServiceClientService],
})
export class ServiceClientModule {}
