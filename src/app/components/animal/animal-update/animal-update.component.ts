import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Raca } from 'src/app/models/Raca';
import { AnimalService } from 'src/app/services/animal.service';
import { RacaService } from 'src/app/services/raca.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/Animal';
import { Observer } from 'rxjs';

const moment = _moment;

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
  selector: 'app-animal-update',
  templateUrl: './animal-update.component.html',
  styleUrls: ['./animal-update.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Use the desired locale here
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
})
export class AnimalUpdateComponent implements OnInit {

  animalForm: FormGroup;

  animal: Animal = {
    id: '',
    nome: '',
    dono: '',
    telefone: '',
    tipo: '',
    nascimento: '',
    raca: undefined
  };

  racas: Raca[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AnimalService,
    private racaService: RacaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.animalForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dono: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      nascimento: ['', [Validators.required, Validators.minLength(3)]],
      raca: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.animal.id = this.route.snapshot.paramMap.get('id');
    this.findAllRacas();
    this.findById();
  }

  findById(): void {
    this.service.findById(this.animal.id).subscribe(resposta => {
      this.animal = resposta;
      this.populateForm();
    });
  }

  findAllRacas() {
    this.racaService.findAll().subscribe(resposta => {
      this.racas = resposta
    });
  }

  populateForm(): void {
    this.animalForm.patchValue({
      nome: this.animal.nome,
      dono: this.animal.dono,
      telefone: this.animal.telefone,
      tipo: this.animal.tipo,
      nascimento: this.animal.nascimento,
      raca: this.animal.raca?.id
    });
  }

  update(): void {
    if (this.animalForm.valid) {

      const updateAnimal: Animal = {
        id: this.animal.id,
        nome: this.animalForm.value.nome,
        dono: this.animalForm.value.dono,
        telefone: this.animalForm.value.telefone,
        tipo: this.animalForm.value.tipo,
        nascimento: this.animalForm.value.nascimento,
        raca: this.animalForm.value.raca
      }

      const observer: Observer<Raca> = {
        next: () => {
          this.toast.success('Animal atualizada com sucesso', 'Update');
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

      this.service.update(updateAnimal).subscribe(observer);
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
