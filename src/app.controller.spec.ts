import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getExchangeValue', () => {
    it('should return a converted amount', async () => {
      const result = await appController.getExchangeValue({
        from: 'USD',
        to: 'EUR',
        amount: 1,
      });
      expect(typeof result).toBe('string');
      expect(parseFloat(result)).toBeGreaterThan(0);
    });
  });
});
