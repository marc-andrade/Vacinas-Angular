import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Raca } from 'src/app/models/Raca';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-raca-insert',
  templateUrl: './raca-insert.component.html',
  styleUrls: ['./raca-insert.component.css'],
})
export class RacaInsertComponent implements OnInit {
  raca: Raca = {
    nome: '',
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: RacaService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.raca).subscribe(
      () => {
        this.toast.success('Raca cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['vacinas']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: { message: string }) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  validaCampos(): boolean {
    return this.nome.valid;
  }
}
