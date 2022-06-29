import { environment } from "src/environments/environment";
import { Content } from "./content";

/**
 * Représente le type JCMS "Indication"
 */
export interface Indication extends Content {

  icon: string|undefined
}

export class IndicationMap {

  public mapToIndication(dataRep: any): Indication {
    return {
      id: dataRep.id,
      title: dataRep.title,
      class: dataRep.class,
      icon: this.checkURL(dataRep.icon) ? environment.jcms + dataRep.icon : dataRep.icon,
    };
  }

  private checkURL(url: string) {
    return(url.match(/\.(jpeg|jpg|gif|png|ico)$/) != null);
  }
}
