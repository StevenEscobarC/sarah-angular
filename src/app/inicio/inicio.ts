import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioService } from '../services/audio.service';
import gsap from 'gsap';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div #root class="w-full max-w-3xl mx-auto p-10 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl border border-pink-200 text-center relative overflow-hidden">
    <h1 class="text-5xl font-bold text-pink-600 mb-3 font-dancing">Hola Sarah 💕</h1>
    <p class="text-lg text-gray-700 mb-8">Tengo un detalle muy especial para ti... una pequeña historia sobre nosotros 💌</p>
    <p class="text-md text-gray-700 mb-8">Tengo tantas cosas por decirte que no creo que me alcancen palabras para expresar lo mucho que <b>TE AMO</b>,
    pero espero que esta pequeña sorpresa logre transmitir aunque sea una fracción de todo lo que siento por ti.
    <br>
    <br>
    Te has convertido en mi persona favorita, en mi inspiración diaria y en la razón por la que sonrío sin motivo aparente. 
    Cada momento a tu lado es un regalo que atesoro profundamente.
    <br>
    <br>
    Gracias por tu amor incondicional y por hacerme sentir el hombre más afortunado del mundo, así sea a la distancia.
    Me haces querer ser mejor cada día, y no puedo esperar para seguir construyendo recuerdos juntos.
    </p>


    <div class="grid grid-cols-3 gap-4 mb-10">
      <img src="/assets/fotosarah1.jpg" class="rounded-2xl object-cover h-40 w-full shadow-lg border-2 border-pink-200">
      <img src="/assets/fotosarah2.jpg" class="rounded-2xl object-cover h-40 w-full shadow-lg border-2 border-pink-200">
      <img src="/assets/fotosarah3.jpg" class="rounded-2xl object-cover h-40 w-full shadow-lg border-2 border-pink-200">
    </div>

    <div class="flex justify-center gap-6">
      <button (click)="start()" class="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-10 rounded-full shadow-md transition-transform hover:scale-105">
        Ver historia 💞
      </button>
    </div>
  </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #ffe6eb, #ffeaf7, #fbe1ff);
      font-family: 'Poppins', sans-serif;
    }
  `]
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('root', { static: true }) root!: ElementRef;

  constructor(private router: Router, private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.play();
  }

  ngAfterViewInit(): void {
    gsap.from(this.root.nativeElement, { duration: 1, y: 40, opacity: 0, ease: 'power3.out' });

    this.audioService.play();
    document.addEventListener('click', () => this.audioService.play(), { once: true });
  }

  start() {
    gsap.to(this.root.nativeElement, {
      duration: 0.6,
      scale: 0.97,
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => { this.router.navigate(['/historia']); return; }
    });
  }

  toggleAudio(): void {
    this.audioService.toggle();
  }
}
