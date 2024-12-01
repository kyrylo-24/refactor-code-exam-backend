import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiClientService } from './api-client.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ApiClientService],
  exports: [ApiClientService],
})
export class ApiClientModule {}
