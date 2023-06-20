import { registerEnumType } from '@nestjs/graphql';

export enum JOBTYPE {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  INTERNSHIP = 'INTERNSHIP',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
}

registerEnumType(JOBTYPE, {
  name: 'JOBTYPE',
  description: 'JOBTYPE',
  valuesMap: {
    FULLTIME: {
      description: 'FULLTIME',
    },
    PARTTIME: {
      description: 'PARTTIME',
    },
    INTERNSHIP: {
      description: 'INTERNSHIP',
    },
    CONTRACT: {
      description: 'CONTRACT',
    },
  },
});
