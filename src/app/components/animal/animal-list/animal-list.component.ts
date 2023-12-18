import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/Animal';
import { AnimalService } from 'src/app/services/animal.service';
import { DeleteConfirmationModalComponent } from '../../dialog/delete-confirmation-modal/delete-confirmation-modal.component';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent {
  ELEMENT_DATA: Animal[] = [];

  displayedColumns: string[] = ['id','nome','dono','telefone','tipo','nascimento','raca','acoes'];
  dataSource = new MatTableDataSource<Animal>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: AnimalService,
    public dialog: MatDialog,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;

      this.dataSource = new MatTableDataSource<Animal>(resposta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator = this.paginator;
    })
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

    const observer: Observer<Animal> = {
      next: () => {
        this.toast.success('Animal Deletado com sucesso', 'Delecao');
        this.findAll();
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
