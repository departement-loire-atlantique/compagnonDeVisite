import { Component, Input, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { VideoState } from 'src/app/models/video-state';
import { VideoService } from 'src/app/services/video.service';
import { Steps } from '../oeuvre-suiv-pred/oeuvre-suiv-pred.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-lecteur-video-oeuvre',
  templateUrl: './lecteur-video-oeuvre.component.html',
  styleUrls: ['./lecteur-video-oeuvre.component.scss'],
})
export class LecteurVideoOeuvreComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() file!: string | undefined;
  @Input() transcription?: string;
  @Input() name!: string | undefined;
  @Input() steps: Steps | undefined;
  @ViewChild('videoContainer') videoContainer!: ElementRef;

  files!: Array<any>;
  state!: VideoState;
  currentFile: any = {};

  constructor(private videoService: VideoService) {
    this.videoService = new VideoService();
    this.videoService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    this.state.readableCurrentTime = '0';
    this.state.currentTime = 0;
    of(this.file).subscribe(url => { this.files = [{ name: this.name, artist: '', url: url }]; });
    const file = this.files[0];
    this.openFile(file, 0);
  }

  ngAfterViewInit(): void {
    if (this.videoContainer)
      this.videoService.setParent(this.videoContainer.nativeElement)
  }


  ngOnDestroy(): void {
    this.pause();
  }

  playStream(url: string) {
    this.videoService.playStream(url).subscribe();
  }

  play() {
    this.videoService.play();
  }

  pause() {
    this.videoService.pause();
  }

  stop() {
    this.videoService.stop();
  }

  openFile(file: any, index: number) {
    this.currentFile = { index, file };
    this.videoService.stop();
    this.playStream(file.url);
  }

  onSliderChangeEnd(event: any) {
    this.videoService.seekTo(event.target.value);
  }

  /**
   * Verif le format de la video
   * @param url l'url de la video
   * @returns true si dans le bon format
   */
  // checkURL(url: string) {
  //   return (url.match(/\.(mp4)$/) != null);
  // }
}
