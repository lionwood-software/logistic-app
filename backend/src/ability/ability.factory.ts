import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Order } from '../orders/entities/order.entity';
import { RoleType } from '../auth/enums/role-type';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User | typeof Order> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role.name === RoleType.Admin) {
      can(Action.Manage, 'all');
    }

    if (user.role.name === RoleType.Carrier) {
      can(Action.Read, Order, { userId: { $eq: user.id } });
      can(Action.Read, Order, { userId: { $eq: null } });
    }

    if (user.role.name === RoleType.Shipper) {
      can(Action.Read, Order, { shipperId: { $eq: user.id } });
      can(Action.Read, Order, { userId: { $eq: null } });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
