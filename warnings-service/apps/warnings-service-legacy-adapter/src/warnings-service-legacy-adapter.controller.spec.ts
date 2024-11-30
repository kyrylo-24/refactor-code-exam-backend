import { Test, TestingModule } from '@nestjs/testing';
import { WarningsServiceLegacyAdapterController } from './warnings-service-legacy-adapter.controller';
import { WarningsServiceLegacyAdapterService } from './warnings-service-legacy-adapter.service';

describe('WarningsServiceLegacyAdapterController', () => {
  let warningsServiceLegacyAdapterController: WarningsServiceLegacyAdapterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WarningsServiceLegacyAdapterController],
      providers: [WarningsServiceLegacyAdapterService],
    }).compile();

    warningsServiceLegacyAdapterController = app.get<WarningsServiceLegacyAdapterController>(WarningsServiceLegacyAdapterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(warningsServiceLegacyAdapterController.getHello()).toBe('Hello World!');
    });
  });
});
