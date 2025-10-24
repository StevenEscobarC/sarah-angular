import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio';
import { HistoriaComponent } from './historia/historia';
import { FinalComponent } from './final/final';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'historia', component: HistoriaComponent },
  { path: 'final', component: FinalComponent },
  { path: '**', redirectTo: '' }
];
