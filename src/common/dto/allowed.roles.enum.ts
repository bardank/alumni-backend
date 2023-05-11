import { registerEnumType } from '@nestjs/graphql';

export enum AllowedRole {
  ad = 'ad',
  cl = 'cl',
}

registerEnumType(AllowedRole, {
  name: 'AllowedRole',
  description: 'AllowedRole',
  valuesMap: {
    ad: {
      description: 'Admin',
    },
    cl: {
      description: 'Client',
    },
  },
});
