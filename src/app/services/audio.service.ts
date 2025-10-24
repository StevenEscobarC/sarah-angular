import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;
  private isPlaying = false;

  constructor() {
    this.audio = new Audio('assets/cancion.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.6; 
  }

  play() {
    if (!this.isPlaying) {
      this.audio.play().then(() => {
        this.isPlaying = true;
      }).catch(() => {
        console.warn('Autoplay bloqueado, esperando interacción del usuario...');
      });
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
}
