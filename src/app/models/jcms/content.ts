import { environment } from "src/environments/environment";

/**
 * Contenu JCMS
 */
export interface Content {

  /**
   * id JCMS
   */
  id: string,

  /**
   * Nom du contenu
   */
  title: string,

  /**
   * class java du contenu JCMS
   */
  class: string
}

/**
 * Return media with JCMS url base or url
 * @param url
 */
const regex: RegExp = new RegExp('http(s)?:\/\/');
export function buildUrlMedia(url: string | undefined): string {
  if (!url) {
    return '';
  }
  if (regex.test(url)) {
    return url;
  }
  return environment.jcms + url;

}
