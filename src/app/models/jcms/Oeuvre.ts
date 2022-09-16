import { Carousel } from "./carousel";
import { buildUrlMedia, Content } from "./content";

/**
 * Link for JCMS content oeuvre
 */
 export interface Oeuvre extends Content {

  description: string | undefined,

    /**
   * De type Carousel
   */
  diaporama: Carousel | undefined,

  fichierSon: string | undefined,

  fichierSonDaide: string | undefined,

  vignette: string | undefined,

  indications: string | undefined,

  plan: string | undefined,

    /**
   * Category
   */
  categorieDeNavigation: Content[] | undefined,

     /**
      * Category
      */
  miseEnAvant: Content[] | undefined,

  video: string | undefined,

 }

 export class OeuvreMap {

  public mapToOeuvre(dataRep: any): Oeuvre {
    return {
      id: dataRep.id,
      title: dataRep.title,
      class: dataRep.class,
      description: dataRep.description,
      diaporama: dataRep.diaporama,
      fichierSon: buildUrlMedia(dataRep.fichierSon),
      fichierSonDaide: buildUrlMedia(dataRep.fichierSonDaide),
      vignette: buildUrlMedia(dataRep.vignette),
      indications: buildUrlMedia(dataRep.indications),
      plan: buildUrlMedia(dataRep.plan),
      video: buildUrlMedia(dataRep.video),
      categorieDeNavigation: dataRep.categorieDeNavigation,
      miseEnAvant: dataRep.miseEnAvant,
    };
  }
}
