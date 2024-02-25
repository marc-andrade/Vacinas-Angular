import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Vacina } from 'src/app/models/Vacina';
import { VacinasService } from 'src/app/services/vacinas.service';
import { DeleteConfirmationModalComponent } from '../../dialog/delete-confirmation-modal/delete-confirmation-modal.component';
import { Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/Animal';
import { AnimalService } from 'src/app/services/animal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Location } from '@angular/common';

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
  selector: 'app-vacinas-list',
  templateUrl: './vacinas-list.component.html',
  styleUrls: ['./vacinas-list.component.css'],
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
export class VacinasListComponent {

  vacinaForm: FormGroup;
  ELEMENT_DATA: Vacina[] = [];

  animalId: number;

  animal: Animal = {
    id: '',
    nome: '',
    dono: '',
    telefone: '',
    tipo: '',
    nascimento: '',
    raca: undefined
  };

  displayedColumns: string[] = ['id','nome','data','animal','acoes'];
  dataSource = new MatTableDataSource<Vacina>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: VacinasService,
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    public dialog: MatDialog,
    private toast: ToastrService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) {
      this.vacinaForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        data: ['', [Validators.required, Validators.minLength(3)]],
        animal: ['', []]
      });
     }

  ngOnInit(): void {
    this.animalId = +this.route.snapshot.paramMap.get('id');
    this.findAllByAnimalId()
    this.findAnimalById()
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;

      this.dataSource = new MatTableDataSource<Vacina>(resposta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator = this.paginator;
    })
  }

  findAllByAnimalId() {
    this.service.findAllByAnimalId(this.animalId).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Vacina>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  findAnimalById(): void {
    this.animalService.findById(this.animalId).subscribe(resposta => {
      this.animal = resposta;
    });
  }

  create(): void {
    const newVacina: Vacina = this.vacinaForm.value
    newVacina.animal = this.animal
    const observer: Observer<Vacina> = {
      next: () => {
        this.toast.success('Vacina cadastrada com sucesso', 'Cadastro');
        this.resetForm();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.location.path()]);
        });
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
    this.animalId = this.animalId
  }

  resetForm(): void {
    this.vacinaForm.reset({
      nome: '',
      data: ''
    });
  }

  validaCampos(): boolean {
    return this.vacinaForm.value.nome && this.vacinaForm.value.data;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openConfirmationModal(element: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(element);
      }
    });
  }

  deleteItem(element: any) {

    const observer: Observer<Vacina> = {
      next: () => {
        this.toast.success('Vacina Deletado com sucesso', 'Delecao');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.location.path()]);
        });
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
    this.service.delete(element).subscribe(observer);
  }
}
