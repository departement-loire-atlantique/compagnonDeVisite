export interface Environment {
  production: boolean,
  jcms: string,
  token: string,
  catHome: string,
  lang: { [key: string]: { espace: string, catHome: string } },
}
