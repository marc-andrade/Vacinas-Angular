import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Raca } from 'src/app/models/Raca';
import { RacaService } from 'src/app/services/raca.service';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../../dialog/delete-confirmation-modal/delete-confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raca-list',
  templateUrl: './raca-list.component.html',
  styleUrls: ['./raca-list.component.css']
})
export class RacaListComponent {

  ELEMENT_DATA: Raca[] = [];

  displayedColumns: string[] = ['id', 'nome','acoes'];
  dataSource = new MatTableDataSource<Raca>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: RacaService,
    public dialog: MatDialog,
     private toast: ToastrService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;

      this.dataSource = new MatTableDataSource<Raca>(resposta);
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
        // Se o usuário confirmar a exclusão no modal
        this.deleteItem(element);
      }
    });
  }

  deleteItem(element: any) {

    const observer: Observer<Raca> = {
      next: () => {
        this.toast.success('Raça Deletada com sucesso', 'Delecao');
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
