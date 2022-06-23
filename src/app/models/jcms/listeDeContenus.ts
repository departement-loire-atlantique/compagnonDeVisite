import { Content } from "./content";

/**
 * Contenu JCMS ListeDeContenus
 */
export interface ListeDeContenus extends Content {
  title: string,
  contenus: Content[],
}
