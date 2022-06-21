import { Content } from "./content";
import { Jexplore } from "./jexplore";

/**
 * Contenu JCMS ListeDeContenus
 */
export interface ListeDeContenus extends Content {
  title: string,
  contenu: Jexplore[],
}
