import { RacaService } from 'src/app/services/raca.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { Animal } from 'src/app/models/Animal';
import { AnimalService } from 'src/app/services/animal.service';
import { Raca } from 'src/app/models/Raca';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-animal-insert',
  templateUrl: './animal-insert.component.html',
  styleUrls: ['./animal-insert.component.css'],
   providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Use the desired locale here
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
})
export class AnimalInsertComponent implements OnInit {

  animalForm: FormGroup;

  racas: Raca[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AnimalService,
    private racaService: RacaService,
    private toast: ToastrService,
    private router: Router,
  ) {
    this.animalForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dono: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required]],
      nascimento: ['', [Validators.required, Validators.minLength(3)]],
      raca: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.findAllRacas();
  }

  findAllRacas() {
    this.racaService.findAll().subscribe(resposta => {
      this.racas = resposta
    });
  }

  create(): void {
    if (this.animalForm.valid) {
      const newAnimal: Animal = {
        nome: this.animalForm.value.nome,
        dono: this.animalForm.value.dono,
        telefone: this.animalForm.value.telefone,
        tipo: this.animalForm.value.tipo,
        nascimento: this.animalForm.value.nascimento,
        raca: this.animalForm.value.raca
      };

      const observer: Observer<Animal> = {
        next: () => {
          this.toast.success('Animal cadastrado com sucesso', 'Cadastro');
          this.resetForm();
          this.router.navigate(['animais'])
        },
        error: (ex: any) => {
          if (ex.error.errors) {
            ex.error.errors.forEach((element: { message: string }) => {
              this.toast.error(element.message);
            });
          } else {
            this.toast.error(ex.error.message);
          }
        },
        complete: () => {
        }
      };

      this.service.create(newAnimal).subscribe(observer);
    }
  }

  resetForm(): void {
    this.animalForm.reset({
      nome: '',
      dono: '',
      telefone: '',
      tipo: '',
      nascimento: '',
      raca: undefined
    });
  }

  validaCampos(): boolean {
    return this.animalForm.value.nome
    && this.animalForm.value.dono
    && this.animalForm.value.telefone
    && this.animalForm.value.tipo
    && this.animalForm.value.nascimento
    && this.animalForm.value.raca;
  }
}
