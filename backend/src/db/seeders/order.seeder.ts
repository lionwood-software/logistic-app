import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export class OrderSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Order)().createMany(500);
  }
}
