import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {
  @Input()
  url?: string;

  constructor() {}

  /**
   * Verif l'url et la renvoie si elle est correcte
   * @returns l'url de la video
   */
  getUrl() {
    if(this.url)
      return this.checkURL(this.url);

    return undefined;
  }

  /**
   * Verif le format de la video
   * @param url l'url de la video
   * @returns true si dans le bon format
   */
  checkURL(url: string) {
    return(url.match(/\.(mp4)$/) != null);
  }
}
