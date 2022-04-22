import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GasPriceRepo } from '../db/repositories/gas-price.repo';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  constructor(
    private readonly gasPriceRepo: GasPriceRepo,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'America/Los_Angeles',
  })
  handleCron() {
    axios
      .get(this.configService.get<string>('API_GAS_PRICES_URL'), {
        headers: {
          'Content-Type': 'application/json',
          authorization: this.configService.get<string>(
            'API_GAS_PRICES_SECRET_KEY',
          ),
        },
      })
      .then(async (response) => {
        await this.gasPriceRepo.clear();
        await this.gasPriceRepo.create(response.data.result);
      });
  }
}
