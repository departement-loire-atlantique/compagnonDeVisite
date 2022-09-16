import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { VideoState } from "../models/video-state";

@Injectable({
  providedIn: "root"
})
export class VideoService {

  private stop$;
  private videoObj: HTMLVideoElement;

  constructor() {
    this.stop$ = new Subject();
    this.videoObj = document.createElement('video') as HTMLVideoElement;
  }

  public setParent(parent: any) {
    if (parent)
      parent.prepend(this.videoObj);
  }

  playStream(url: any) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  videoEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart",
  ];

  private state: VideoState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
    ended: false,
  };

  private stateChange: BehaviorSubject<VideoState> = new BehaviorSubject(
    this.state
  );

  getState(): Observable<VideoState> {
    return this.stateChange.asObservable();
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  play() {
    this.videoObj.play();
  }

  pause() {
    this.videoObj.pause();
  }

  stop() {
    this.stop$.next;
  }

  seekTo(seconds: number) {
    this.videoObj.currentTime = seconds;
  }

  formatTime(time: number): string {
    return (new Date(time * 1000)).toString();
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.videoObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        this.state.ended = false;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.videoObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "ended":
        this.state.ended = true;
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }
  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      ended: false,
    };
  }
  private streamObservable(url: string) {
    return new Observable(observer => {
      this.videoObj.src = url;
      this.videoObj.load();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.videoObj, this.videoEvents, handler);
      return () => {
        // Stop Playing
        this.videoObj.pause();
        this.videoObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.videoObj, this.videoEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

}
