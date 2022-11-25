import { environment } from 'src/environments/environment';
import { Category } from './category'
import { buildUrlMedia, Content } from './content'
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
  ordre: number,
  video: string | undefined,
  transcription: string,
  videoFin: string | undefined,
  transcriptionFin: string,
  parcoursPMR: boolean,
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
      visuel: buildUrlMedia(dataRep.visuel),
      plan: buildUrlMedia(dataRep.plan),
      etapes: dataRep.etapes,
      jexplore: dataRep.jexplore,
      ordre: dataRep.ordre,
      video: buildUrlMedia(dataRep.video),
      transcription: dataRep.transcription,
      videoFin: buildUrlMedia(dataRep.videoFin),
      transcriptionFin: dataRep.transcriptionFin,
      parcoursPMR: dataRep.parcoursPMR || false,
    };
  }
}

