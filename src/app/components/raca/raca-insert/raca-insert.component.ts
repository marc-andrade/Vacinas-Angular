import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
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
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  create(): void {
    const observer: Observer<Raca> = {
      next: () => {
        this.toast.success('Raça cadastrada com sucesso', 'Cadastro');
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
        // Lida com a lógica após a conclusão (se necessário)
      }
    };

    this.service.create(this.raca).subscribe(observer);
  }

  validaCampos(): boolean {
    return this.nome.valid;
  }
}
