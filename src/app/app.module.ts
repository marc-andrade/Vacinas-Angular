import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RacaInsertComponent } from './components/raca/raca-insert/raca-insert.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { RacaUpdateComponent } from './components/raca/raca-update/raca-update.component';
import { RacaListComponent } from './components/raca/raca-list/raca-list.component';
import { DeleteConfirmationModalComponent } from './components/dialog/delete-confirmation-modal/delete-confirmation-modal.component';
import { NavComponent } from './components/nav/nav.component';
import { AnimalInsertComponent } from './components/animal/animal-insert/animal-insert.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { VacinasInsertComponent } from './components/vacinas/vacinas-insert/vacinas-insert.component';
import { VacinasUpdateComponent } from './components/vacinas/vacinas-update/vacinas-update.component';
import { VacinasListComponent } from './components/vacinas/vacinas-list/vacinas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RacaInsertComponent,
    RacaUpdateComponent,
    RacaListComponent,
    DeleteConfirmationModalComponent,
    NavComponent,
    AnimalInsertComponent,
    AnimalUpdateComponent,
    AnimalListComponent,
    VacinasInsertComponent,
    VacinasUpdateComponent,
    VacinasListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    AsyncPipe,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
