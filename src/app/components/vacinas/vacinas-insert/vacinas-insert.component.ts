import { AnimalService } from 'src/app/services/animal.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-vacinas-insert',
  templateUrl: './vacinas-insert.component.html',
  styleUrls: ['./vacinas-insert.component.css'],
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
export class VacinasInsertComponent {
  vacinaForm: FormGroup;
  animais: Animal[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<Animal[]>;

  constructor(
    private formBuilder: FormBuilder,
    private service: VacinasService,
    private toast: ToastrService,
    private router: Router,
    private animalService: AnimalService
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.vacinaForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required, Validators.minLength(3)]],
      animal: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.findAllAnimais();
  }

  displayFn(subject) {
    return subject ? subject.nome : undefined;
  }

  selectedAnimal(event: any) {
    this.vacinaForm.get('animal')?.setValue(event.option.value);
  }


  private _filter(value: string | Animal): Animal[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : value.nome.toLowerCase();
    return this.animais.filter(animal => animal.nome.toLowerCase().includes(filterValue));
  }




  findAllAnimais() {
    this.animalService.findAll().subscribe((resposta) => {
      this.animais = resposta;
    });
  }

  create(): void {
    const newVacina: Vacina = this.vacinaForm.value

    const observer: Observer<Vacina> = {
      next: () => {
        this.toast.success('Vacina cadastrada com sucesso', 'Cadastro');
        this.resetForm();
        this.router.navigate(['racas']);
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

    this.service.create(newVacina).subscribe(observer);
  }

  resetForm(): void {
    this.vacinaForm.reset({
      nome: '',
      data: '',
      animal: undefined
    });
  }

  validaCampos(): boolean {
    return this.vacinaForm.value.nome && this.vacinaForm.value.data && this.vacinaForm.value.animal;
  }

}
