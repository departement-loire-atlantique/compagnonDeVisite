// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "src/app/models/environment";

export const environment: Environment = {
  production: false,
  jcms: 'http://localhost:8080/GP/',
  front: 'http://127.0.0.1:8089/',
  token: 'djI7ZmRlXzUwNDQ7MTY5NDA3NzY2Nzg0NjtHRVQsOzsyNTskMmEkMDQkOVJBSG5UT1oua0tVd0JGd1Bjb2dxLk1pLkpNYUhuL25hV0hNZ0VwbUZkenVNQzBmMnlQLnE=',
  catJExplore: 'c_5023',
  lang: {
    'fr': { espace: 'c_5019', catHome: 'c_5020' },
    'en': { espace: 'c_5015', catHome: 'c_5016' },
    'fr-LSF': { espace: 'c_5011', catHome: 'c_5012' },
    'fr-FALC': { espace: '', catHome: '' }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
