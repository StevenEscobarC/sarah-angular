import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<div class="min-h-screen flex items-center justify-center">
               <router-outlet></router-outlet>
             </div>`
})
export class AppComponent {
  // private audio!: HTMLAudioElement;

  // ngOnInit() {
  //   this.audio = new Audio('assets/music.mp3');
  //   this.audio.loop = true;

  //   // Algunos navegadores bloquean autoplay si no hay interacción del usuario,
  //   // así que intentamos reproducir y si no funciona, esperamos un click.
  //   const playAudio = () => {
  //     this.audio.play().catch(() => {
  //       console.warn('Autoplay bloqueado, esperando interacción del usuario...');
  //     });
  //   };

  //   playAudio();

  //   // Fallback: reproducir al primer click del usuario
  //   document.addEventListener('click', () => this.audio.play(), { once: true });
  // }

  // ngOnDestroy() {
  //   this.audio.pause();
  //   this.audio.currentTime = 0;
  // }
}


