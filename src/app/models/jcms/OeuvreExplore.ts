import { Carousel } from "./carousel";
import { Content } from "./content";

/**
 * Link for JCMS content oeuvre
 */
 export interface OeuvreExplore extends Content {

  titre: string | undefined,

  description: string | undefined,

    /**
   * De type Carousel
   */
  diaporama: Carousel | undefined,

  fichierSon: string | undefined,

  fichierSonDaide: string | undefined,

    /**
   * Category
   */
  categorieDeNavigation: Content[] | undefined,

     /**
      * Category
      */
  miseEnAvant: Content[] | undefined,

 }
