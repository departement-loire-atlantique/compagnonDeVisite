import { Component, Input, OnInit, Output } from '@angular/core';
import { AudioState } from 'src/app/interfaces/audio-state';
import { AudioService } from 'src/app/services/audio.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-lecteur-audio',
  templateUrl: './lecteur-audio.component.html',
  styleUrls: ['./lecteur-audio.component.scss']
})
export class LecteurAudioComponent implements OnInit {

  @Input() file!: string | undefined;
  @Input() name!: string | undefined;

  @Output() audioEnded = new EventEmitter<boolean>();

  files!: Array<any>;
  state!: AudioState;
  currentFile: any = {};

  constructor(
    public audioService: AudioService,
    ) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    this.state.currentTime = 0;
    of(this.file).subscribe(url => { this.files = [ { name: this.name, artist: '', url: url}]; });
    const file = this.files[0];
    this.openFile(file, 0);
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
    /*  // Play next song
    if (this.state.ended === true && !this.isLastPlaying()){
        this.next();
      }*/
      this.audioEnded.emit(this.state.ended);

      if( this.state.ended) {
        this.stop();
      }
    });
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }
  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  openFile(file: any, index: number) {
    this.currentFile = {index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  onSliderChangeEnd(event: any) {
    this.audioService.seekTo(event.target.value);
  }
}


