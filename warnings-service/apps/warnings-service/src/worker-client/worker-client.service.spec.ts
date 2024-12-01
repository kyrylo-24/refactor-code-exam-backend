import { Test, TestingModule } from '@nestjs/testing';
import { WorkerClientService } from './worker-client.service';

describe('WorkerClientService', () => {
  let service: WorkerClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerClientService],
    }).compile();

    service = module.get<WorkerClientService>(WorkerClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
