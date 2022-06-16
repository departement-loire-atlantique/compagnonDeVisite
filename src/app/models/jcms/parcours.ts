/**
 * Contenu JCMS Parcours
 */
import { Category } from './category'
import { Content } from './content'
export interface Parcours extends Content {
  title: string,
  categories: Category,
  duree: number,
  public1: string
}
