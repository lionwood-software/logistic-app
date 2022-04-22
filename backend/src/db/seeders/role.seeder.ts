import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../auth/entities/role.entity';
import { RoleType } from '../../auth/enums/role-type';

export default class RoleSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          name: RoleType.Carrier,
          description: 'Carrier role',
        },
        {
          name: RoleType.Shipper,
          description: 'Shipper role',
        },
        {
          name: RoleType.Admin,
          description: 'User that administrate site',
        },
      ])
      .execute();
  }
}
