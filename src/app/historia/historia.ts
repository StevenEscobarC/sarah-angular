import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div #root class="w-full max-w-3xl mx-auto p-8 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl border border-pink-200 relative overflow-hidden">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-pink-600">Nuestra historia</h2>
      <button (click)="goFinal()" class="text-sm text-gray-600 hover:text-pink-500 transition">Saltar a la pregunta</button>
    </div>

    <div class="relative w-full h-[440px] flex items-center justify-center">
      <section *ngFor="let paso of pasos; let i = index"
               #cardElem
               class="absolute inset-0 flex flex-col items-center justify-center transition-all"
               [style.zIndex]="i === index ? 20 : 10"
               [style.opacity]="i === index ? 1 : 0">
        <img [src]="paso.img"
             class="w-[420px] h-[300px] rounded-3xl object-cover shadow-xl border-4 border-pink-300"
             alt="foto">
        <div class="mt-4 text-center px-4">
          <p class="text-sm text-gray-600">Paso {{ i + 1 }}</p>
          <h3 class="font-semibold text-2xl text-pink-700 mt-1">{{ paso.titulo }}</h3>
          <p class="text-gray-700 text-base mt-1">{{ paso.texto }}</p>
        </div>
      </section>
    </div>

    <div class="mt-8 flex justify-center gap-4">
      <button (click)="prev()" class="bg-white border border-pink-300 text-pink-600 font-semibold py-2 px-6 rounded-full shadow-sm hover:scale-105 transition">Atrás</button>
      <button (click)="next()" class="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all">
        {{ index < pasos.length - 1 ? 'Siguiente' : 'Ver final ❤️' }}
      </button>
    </div>

    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
      <span *ngFor="let p of pasos; let ii = index" 
            class="w-3 h-3 rounded-full"
            [class.bg-pink-600]="ii === index"
            [class.bg-pink-200]="ii !== index"></span>
    </div>
  </div>
  `
})
export class HistoriaComponent implements AfterViewInit {
  pasos = [
    { img: '/assets/fotosarah1.jpg', titulo: 'Cómo nos conocimos', texto: 'Aquel día en que todo cambió...' },
    { img: '/assets/fotosarah2.jpg', titulo: 'La primera risa', texto: 'Recuerdo tu risa, me conquistó.' },
    { img: '/assets/fotosarah3.jpg', titulo: 'Momentos juntos', texto: 'Pequeños momentos que significan todo.' }
  ];

  @ViewChildren('cardElem', { read: ElementRef }) cardElems!: QueryList<ElementRef>;
  index = 0;
  animating = false;
  private rootEl?: HTMLElement;

  constructor(private router: Router, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.rootEl = this.el.nativeElement.querySelector('#root');
    const elems = this.cardElems.toArray().map(e => e.nativeElement as HTMLElement);
    elems.forEach((el, i) => {
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.95 });
    });
  }

  next() {
    if (this.animating) return;
    const elems = this.cardElems.toArray().map(e => e.nativeElement as HTMLElement);

    if (this.index >= this.pasos.length - 1) {
      gsap.to(this.el.nativeElement, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          this.router.navigate(['/final']).then(() => {
            gsap.set(this.el.nativeElement, { opacity: 1 });
          });
        }
      });
      return;
    }

    const current = elems[this.index];
    const next = elems[this.index + 1];
    this.animating = true;

    gsap.to(current, { autoAlpha: 0, scale: 0.95, y: -40, duration: 0.4, ease: 'power2.in' });
    gsap.fromTo(next,
      { autoAlpha: 0, scale: 0.9, y: 40 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2, onComplete: () => {
        this.index++;
        this.animating = false;
      }});
  }

  prev() {
    if (this.animating || this.index <= 0) return;
    const elems = this.cardElems.toArray().map(e => e.nativeElement as HTMLElement);
    const current = elems[this.index];
    const prev = elems[this.index - 1];

    this.animating = true;
    gsap.to(current, { autoAlpha: 0, scale: 0.95, y: 40, duration: 0.4, ease: 'power2.in' });
    gsap.fromTo(prev,
      { autoAlpha: 0, scale: 0.9, y: -40 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2, onComplete: () => {
        this.index--;
        this.animating = false;
      }});
  }

  goFinal() {
    gsap.to(this.el.nativeElement, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        this.router.navigate(['/final']).then(() => {
          gsap.set(this.el.nativeElement, { opacity: 1 });
        });
      }
    });
  }
}
