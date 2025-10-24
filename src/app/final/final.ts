import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-purple-300 relative overflow-hidden p-6 md:p-12">
  
  <h1 class="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-10 text-center">
    💕 ¡Mi Cielo! 💕
  </h1>

  <div class="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-pink-200 text-pink-700 text-center space-y-4 p-6 md:p-10 max-w-3xl mx-auto">
    <p>Desde aquel día que todo comenzó, cada momento ha sido especial, contigo he conocido lo que se siente el verdadero amor.</p>
    <p>Y aunque esta historia apenas empieza, sé que cada capítulo será aún mejor 💫. Siento que lo puedo lograr todo a tu lado
    y quiero que me des la oportunidad de seguir escribiendo cada página juntos.
    </p>
    <p>Gracias por acompañarme, por ser mi lugar seguro y mi razón para seguir creando cosas hermosas como esta 💕. <b>GRACIAS POR SER TÚ</b></p>
  </div>
  <br>
  <button
    (click)="openModal()"
    class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
  >
    Entonces... ✨
  </button>

  <div
    *ngIf="isModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
    (click)="closeModal()"
  >
    <div
      class="modal-content bg-white backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-pink-300 text-center w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      (click)="$event.stopPropagation()"
    >
      <img
        src="/assets/vegeta.jpeg"
        alt="Vegeta y Bulma"
        class="mx-auto rounded-2xl shadow-md mb-6 w-30"
      />

      <div class="text-pink-700 space-y-4 mb-6">
        <p class="text-lg font-semibold text-pink-600 mb-4">
        💖 ¿Me darías la oportunidad de ser parte de tu historia? 💖
      </p>

      </div>

      <button
        (click)="closeModal()"
        class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow transition-all duration-300"
      >
        Cerrar
      </button>
       <button
        (click)="inicio()"
        class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow transition-all duration-300"
      >
        Inicio
      </button>
    </div>
  </div>
</div>

`,
})
export class FinalComponent {
  isModalOpen = false;

  constructor(private router: Router) { }

  openModal() {
    this.isModalOpen = true;
    setTimeout(() => {
      gsap.fromTo(
        '.modal-content',
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    });
  }

  closeModal() {
    gsap.to('.modal-content', {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => { this.isModalOpen = false; },
    });
  }

  inicio() {
    this.router.navigate(['']); return;
  }
}
