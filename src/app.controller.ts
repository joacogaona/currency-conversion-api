import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

interface ConversionData {
  from: string;
  to: string;
  amount: number;
}
@ApiTags('conversion')
@Controller('conversion')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //SWAGGER
  @ApiQuery({ name: 'from', required: true, type: String })
  @ApiQuery({ name: 'to', required: true, type: String })
  @ApiQuery({ name: 'amount', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Returns the converted amount' })
  //
  getExchangeValue(@Query() conversionData: ConversionData): Promise<string> {
    return this.appService.getExchangeValue(conversionData);
  }

  @Post()
  //SWAGGER
  @ApiResponse({ status: 200, description: 'Local rates updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //
  updateLocalRates(@Headers('x-api-key') apiKey: string, @Body() newRates) {
    if (apiKey !== process.env.WEBHOOK_SECRET) {
      throw new UnauthorizedException();
    }
    this.appService.updateLocalRates({ newRates });
  }
}
