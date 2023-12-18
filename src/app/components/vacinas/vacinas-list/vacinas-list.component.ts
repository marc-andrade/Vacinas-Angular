import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Vacina } from 'src/app/models/Vacina';
import { VacinasService } from 'src/app/services/vacinas.service';
import { DeleteConfirmationModalComponent } from '../../dialog/delete-confirmation-modal/delete-confirmation-modal.component';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-vacinas-list',
  templateUrl: './vacinas-list.component.html',
  styleUrls: ['./vacinas-list.component.css']
})
export class VacinasListComponent {

  ELEMENT_DATA: Vacina[] = [];

  displayedColumns: string[] = ['id','nome','data','animal','acoes'];
  dataSource = new MatTableDataSource<Vacina>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: VacinasService,
    public dialog: MatDialog,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;

      this.dataSource = new MatTableDataSource<Vacina>(resposta);
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

    const observer: Observer<Vacina> = {
      next: () => {
        this.toast.success('Vacina Deletado com sucesso', 'Delecao');
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
