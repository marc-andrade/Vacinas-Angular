import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacaInsertComponent } from './components/raca/raca-insert/raca-insert.component';
import { RacaListComponent } from './components/raca/raca-list/raca-list.component';
import { RacaUpdateComponent } from './components/raca/raca-update/raca-update.component';
import { NavComponent } from './components/nav/nav.component';
import { AnimalInsertComponent } from './components/animal/animal-insert/animal-insert.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { VacinasInsertComponent } from './components/vacinas/vacinas-insert/vacinas-insert.component';

const routes: Routes = [

  { path: '', component: NavComponent, children: [
    { path: 'racas', component: RacaListComponent},
    { path: 'racas/create', component: RacaInsertComponent},
    { path: 'racas/update/:id', component: RacaUpdateComponent},
    { path: 'animais', component: AnimalListComponent},
    { path: 'animais/create', component: AnimalInsertComponent},
    { path: 'animais/update/:id', component: AnimalUpdateComponent},
    { path: 'vacinas/create', component: VacinasInsertComponent},
  ]}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
