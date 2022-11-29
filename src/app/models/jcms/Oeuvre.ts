import { Carousel } from "./carousel";
import { buildUrlMedia, Content } from "./content";

/**
 * Link for JCMS content oeuvre
 */
 export interface Oeuvre extends Content {

  titreCourt: string | undefined,

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

  transcription: string | undefined,

  localisation: string | undefined;

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
      transcription: dataRep.transcription,
      categorieDeNavigation: dataRep.categorieDeNavigation,
      miseEnAvant: dataRep.miseEnAvant,
      localisation: dataRep.localisation,
      titreCourt: dataRep.titreCourt,
    };
  }
}
