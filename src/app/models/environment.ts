export interface Environment {
  production: boolean,
  jcms: string,
  token: string,
  catHome: string,
  lang: { [key: string]: JcmsEspace },
}

export interface JcmsEspace {
  espace: string,
  catHome: string,
}
