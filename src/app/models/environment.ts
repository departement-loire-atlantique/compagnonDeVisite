export interface Environment {
  production: boolean,
  jcms: string,
  front: string,
  token: string,
  catJExplore: string,
  catRoot: string,
  lang: { [key: string]: JcmsEspace },
}

export interface JcmsEspace {
  espace: string,
  catHome: string,
}
