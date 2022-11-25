import { Environment } from "src/app/models/environment";

export const environment: Environment = {
  production: true,

  jcms: 'https://admin-prep-visite-musee-dobree.loire-atlantique.fr/',
  front: 'https://prep-visite-musee-dobree.loire-atlantique.fr/',
  token: '',
  catJExplore: 'c_5036',
  catRoot: 'c_5023',
  lang: {
    'fr': { espace: 'c_5038', catHome: 'c_5039' },
    'en': { espace: 'c_5044', catHome: 'c_5045' },
    'fr-LSF': { espace: 'c_5048', catHome: 'c_5049' },
    'fr-FALC': { espace: 'c_5052', catHome: 'c_5053' }
  }
};
