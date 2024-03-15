import { buildUrlMedia, Content } from "./content";
import { Carousel } from "./carousel";

/**
 * Représente le type JCMS "Menu burger"
 */
export interface MenuBurger extends Content {
  title: string;
  description: string;
  video: string;
  audio: string;
  diaporama: Carousel;
  plan: string;
}
export class MenuBurgerMap {

  public mapToMenuBurger(dataRep: any): MenuBurger {
    return {
      id: dataRep.id,
      class: dataRep.class,
      title: dataRep.title,
      description: dataRep.description,
      video: buildUrlMedia(dataRep.video),
      audio: buildUrlMedia(dataRep.fichierSon),
      diaporama: dataRep.diaporama,
      plan: buildUrlMedia(dataRep.plan),
    };
  }
}
