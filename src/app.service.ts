import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

const localRates = [
  {
    updated_at: 1640131200,
    base_currency: 'USD',
    rates: {
      EUR: 0.9202,
      USD: 1,
      MXN: 17.0775,
      BRL: 4.9762,
    },
  },
];

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  async getExchangeValue({ from, to, amount }): Promise<string> {
    const apiExchange = await firstValueFrom(
      this.httpService
        .get(
          `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_ACCESS_KEY}&symbols=EUR,USD,MXN,BRL,GBP`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'Fixer api error!';
          }),
        ),
    );
    const getHigherConversion = ({ from, to, amount }) => {
      const apiRate =
        apiExchange?.data?.rates?.[to] / apiExchange?.data?.rates?.[from] || 0;

      if (from === 'GBP' || to === 'GBP') {
        if (!apiRate) {
          return 'Fixer api error';
        }
        return (amount * apiRate).toFixed(2);
      } else {
        const lastLocalRate = localRates[localRates.length - 1];
        const localRate = lastLocalRate.rates[to] / lastLocalRate.rates[from];
        return (amount * Math.max(localRate, apiRate)).toFixed(2);
      }
    };

    return getHigherConversion({ from, to, amount });
  }

  updateLocalRates({ newRates }) {
    localRates.push(newRates);
  }
}
