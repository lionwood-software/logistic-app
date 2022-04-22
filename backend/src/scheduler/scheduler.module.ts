import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasPrice } from '../orders/entities/gas-price.entity';
import { GasPriceRepo } from '../db/repositories/gas-price.repo';

@Module({
  imports: [TypeOrmModule.forFeature([GasPrice])],
  providers: [TasksService, GasPriceRepo],
})
export class SchedulerModule {}
