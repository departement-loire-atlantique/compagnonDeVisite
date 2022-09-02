import { Environment } from "src/app/models/environment";

export const environment: Environment = {
  production: true,

  jcms: 'https://admin-prep-visite-musee-dobree.loire-atlantique.fr/',
  token: '',
  lang: {
    'fr': { espace: '', catHome: '' },
    'en': { espace: '', catHome: '' },
    'fr-LSF': { espace: '', catHome: '' }
  }
};
