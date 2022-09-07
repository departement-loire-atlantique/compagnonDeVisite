// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "src/app/models/environment";

export const environment: Environment = {
  production: false,
  jcms: 'http://localhost:8080/GPLA/',
  front: 'http://127.0.0.1:8089/',
  token: 'djI7Y181MDA3OzE2ODY5MTQ3OTkzOTk7R0VULFBVVCxQT1NULERFTEVURSw7OzI2OyQyYSQwNCRPV1J3bmxoOXRlQWZ3T1JwcS9PVTBlZW45eEJvY2NGUE1ZaDFNeEU1MHVyTm80dUV0MTVYYQ==',
  lang: {
    'fr': { espace: 'fde_5034', catHome: 'c_5007', catJExplore: 'fde_5050' },
    'en': { espace: 'fde_5035', catHome: 'fde_5032', catJExplore: 'fde_5050' },
    'fr-LSF': { espace: 'fde_5036', catHome: 'fde_5033', catJExplore: 'fde_5050' },
    'fr-PMR': { espace: '', catHome: '', catJExplore: '' }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
