import { Carousel } from "./carousel";
import { Content } from "./content";
import { ListeDeContenus } from "./listeDeContenus";

/**
 * Link for JCMS content oeuvre
 */
 export interface Oeuvre extends Content {

  titre: string | undefined,

  description: string | undefined,

    /**
   * De type Carousel
   */
  diaporama: Carousel | undefined,

  fichierSon: string | undefined,

  fichierSonDaide: string | undefined,

  vignette: string | undefined,

  indications: ListeDeContenus | undefined,

    /**
   * Category
   */
  categorieDeNavigation: Content[] | undefined,

     /**
      * Category
      */
  miseEnAvant: Content[] | undefined,

 }
