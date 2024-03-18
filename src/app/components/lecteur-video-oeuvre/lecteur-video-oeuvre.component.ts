import { Component, Input } from '@angular/core';
import { Steps } from '../oeuvre-suiv-pred/oeuvre-suiv-pred.component';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-lecteur-video-oeuvre',
  templateUrl: './lecteur-video-oeuvre.component.html',
  styleUrls: ['./lecteur-video-oeuvre.component.scss'],
})
export class LecteurVideoOeuvreComponent {

  @Input() src!: string | undefined;
  @Input() transcription?: string;
  @Input() name!: string | undefined;
  @Input() steps: Steps | undefined;

  urlSafe : SafeResourceUrl = "";

  constructor( private sanitizer: DomSanitizer){ }

  public getVideo() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.src || "");
    return this.urlSafe;
  }

}
