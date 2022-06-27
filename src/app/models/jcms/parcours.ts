import { environment } from 'src/environments/environment';
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
  plan: string,
  etapes: ListeDeContenus,
  jexplore: boolean,
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
      visuel: this.checkURL(dataRep.visuel) ? environment.jcms + dataRep.visuel : "",
      plan: this.checkURL(dataRep.plan) ? environment.jcms + dataRep.plan : "",
      etapes: dataRep.etapes,
      jexplore: dataRep.jexplore,
    };
  }

  private checkURL(url: string) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
}

