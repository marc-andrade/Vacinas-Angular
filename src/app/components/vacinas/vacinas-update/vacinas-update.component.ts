import { AnimalService } from 'src/app/services/animal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer, map, startWith } from 'rxjs';
import { Vacina } from 'src/app/models/Vacina';
import { VacinasService } from 'src/app/services/vacinas.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Animal } from 'src/app/models/Animal';

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
  selector: 'app-vacinas-update',
  templateUrl: './vacinas-update.component.html',
  styleUrls: ['./vacinas-update.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Use the desired locale here
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class VacinasUpdateComponent implements OnInit{

  vacinaForm: FormGroup;
  animais: Animal[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<Animal[]>;

  vacina: Vacina = {
    id: '',
    nome: '',
    data: '',
    animal: undefined
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: VacinasService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.vacinaForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required, Validators.minLength(3)]],
      animal: ['', []]
    });
  }

  ngOnInit(): void {
    this.vacina.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.vacina.id).subscribe(resposta => {
      this.vacina = resposta;
      this.populateForm();
    });
  }

  populateForm(): void {
    this.vacinaForm.patchValue({
      nome: this.vacina.nome,
      data: this.vacina.data,
      animal: this.vacina.animal
    });
  }

  private _filter(value: string | Animal): Animal[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : value.nome.toLowerCase();
    return this.animais.filter(animal => animal.nome.toLowerCase().includes(filterValue));
  }

  update(): void {
    const updateVacina: Vacina = this.vacinaForm.value
    updateVacina.id = this.vacina.id

    const observer: Observer<Vacina> = {
      next: () => {
        this.toast.success('Vacina atualizada com sucesso', 'Atualizacao');
        this.resetForm();
        this.router.navigate(['vacinas', this.vacina.animal.id]);
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
      complete: () => {},
    };

    this.service.update(updateVacina).subscribe(observer);
  }

  resetForm(): void {
    this.vacinaForm.reset({
      nome: '',
      data: '',
      animal: undefined
    });
  }

  validaCampos(): boolean {
    return this.vacinaForm.value.nome && this.vacinaForm.value.data;
  }

  voltar(): void {
    this.router.navigate(['vacinas', this.vacina.animal.id]);
  }
}
