import { Category } from './category'
import { Content } from './content'
import { ListeDeContenus } from './listeDeContenus';

/**
 * Contenu JCMS Parcours
 */
export interface Parcours extends Content {
  title: string,
  categories: Category,
  description: string,
  duree: number,
  public1: string
  visuel: string,
  etapes: ListeDeContenus,
}

export class ParcoursMap {

  public mapToParcours(dataRep: any): Parcours {
    return {
      id: dataRep.id,
      title: dataRep.title,
      class: dataRep.class,
      categories: dataRep.categories,
      description: dataRep.description,
      duree: dataRep.duree,
      public1: dataRep.public1,
      visuel: dataRep.visuel,
      etapes: dataRep.etapes
    };
  }
}

