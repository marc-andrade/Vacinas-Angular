import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacaInsertComponent } from './components/raca/raca-insert/raca-insert.component';

const routes: Routes = [

  { path: '', component: RacaInsertComponent}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
