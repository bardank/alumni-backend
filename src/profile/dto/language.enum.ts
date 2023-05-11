import { registerEnumType } from '@nestjs/graphql';

export enum AllowedLanguage {
  ar = 'ar',
  ch = 'ch',
  cht = 'cht',
  de = 'de',
  du = 'du',
  en = 'en',
  fr = 'fr',
  it = 'it',
  ko = 'ko',
  po = 'po',
  ru = 'ru',
  sp = 'sp',
  sw = 'sw',
  th = 'th',
  tu = 'tu',
}

registerEnumType(AllowedLanguage, {
  name: 'AllowedLanguage',
  description: 'Allowed languages are en, fr',
  valuesMap: {
    ar: {
      description: 'Arabic',
    },
    ch: {
      description: 'Chinese',
    },
    cht: {
      description: 'Chinese Traditional',
    },
    de: {
      description: 'Deutsch',
    },
    du: {
      description: 'Dutch',
    },
    en: {
      description: 'English',
    },
    fr: {
      description: 'Français',
    },
    it: {
      description: 'Italian',
    },
    ko: {
      description: 'Korean',
    },
    po: {
      description: 'Portuguese',
    },
    ru: {
      description: 'Russian',
    },
    sp: {
      description: 'Spanish',
    },
    sw: {
      description: 'Swedish',
    },
    th: {
      description: 'Thai',
    },
    tu: {
      description: 'Turkish',
    },
  },
});
