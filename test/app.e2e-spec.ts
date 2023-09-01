import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/conversion (GET)', () => {
    return request(app.getHttpServer())
      .get('/conversion?from=USD&to=MXN&amount=25')
      .expect(200)
      .expect((res) => {
        expect(res.text).toBeDefined();
        expect(typeof res.text).toBe('string');
        expect(parseInt(res.text)).toBeGreaterThan(0);
      });
  });
});
