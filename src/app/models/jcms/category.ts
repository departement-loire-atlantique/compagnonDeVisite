export interface Category {
  /**
   * id JCMS
   */
  id: string;

  /**
   * Nom de la catégorie
   */
  title: string;

  /**
   * Nom cour de la catégorie
   */
  smallTitle: string;

  /**
   * Sous titre afficher dans les pages homes
   */
  subTitle: string;

  /**
   * Icon de la catégorie.
   */
  icon: string;

  image: string;

  /**
   * Url interne à l'app
   */
  url: string;

  order: number;

  /**
   * id parent category
   */
  parent: string | undefined;

  /**
   * Affiche ou cache l'exposition
   */
  afficheExpo: string | undefined;

  videoLsf: string | undefined;

  videoLsfTranscription: string | undefined;
}
