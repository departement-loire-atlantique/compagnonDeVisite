// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "src/app/models/environment";

export const environment: Environment = {
  production: false,

  jcms: 'http://10.1.12.88:8080/',
  front: 'http://localhost:8089/',
  token: 'djI7cmVjXzUwMDc7MTY4NzM1Mzg4ODk3MDtHRVQsOzsyMzskMmEkMDQkWDFvTFlMNDdhRzdTYVhCWkFyQnF0T1Bwamk5UHRXNzZKZXZ2UWVsOWRqckx5V0JLZy9HMG0=',
  catJExplore: 'rec_5058',
  catRoot: 'rec_5029',
  lang: {
    'fr': { espace: 'rec_5033', catHome: 'rec_5034' },
    'en': { espace: 'rec_5038', catHome: 'rec_5039' },
    'fr-LSF': { espace: 'rec_5043', catHome: 'rec_5044' },
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
