import { Test, TestingModule } from '@nestjs/testing';
import { WarningsServiceWorkerController } from './warnings-service-worker.controller';
import { WarningsServiceWorkerService } from './warnings-service-worker.service';

describe('WarningsServiceWorkerController', () => {
  let warningsServiceWorkerController: WarningsServiceWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WarningsServiceWorkerController],
      providers: [WarningsServiceWorkerService],
    }).compile();

    warningsServiceWorkerController = app.get<WarningsServiceWorkerController>(WarningsServiceWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(warningsServiceWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
