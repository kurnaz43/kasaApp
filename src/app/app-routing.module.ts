import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'produkt-hinzuguegen',
    loadChildren: () => import('./Pages/produkt-hinzuguegen/produkt-hinzuguegen.module').then(m => m.ProduktHinzuguegenPageModule)
  },
  {
    path: 'warenkorb',
    loadChildren: () => import('./Pages/warenkorb/warenkorb.module').then(m => m.WarenkorbPageModule)
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./Pages/chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  },
  {
    path: 'offene-rechnungen',
    loadChildren: () => import('./Pages/offene-rechnungen/offene-rechnungen.module').then( m => m.OffeneRechnungenPageModule)
  },
  {
    path: 'kunde-hinzufuegen',
    loadChildren: () => import('./Pages/kunde-hinzufuegen/kunde-hinzufuegen.module').then( m => m.KundeHinzufuegenPageModule)
  },
  {
    path: 'kunden-config',
    loadChildren: () => import('./Pages/kunden-config/kunden-config.module').then( m => m.KundenConfigPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
