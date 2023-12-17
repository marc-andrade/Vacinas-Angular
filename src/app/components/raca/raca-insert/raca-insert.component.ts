import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  racaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RacaService,
    private toast: ToastrService,
    private router: Router,
  ) {
    this.racaForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {

  }

  create(): void {
    if (this.racaForm.valid) {
      const newRaca: Raca = {
        nome: this.racaForm.value.nome,
      };

      const observer: Observer<Raca> = {
        next: () => {
          this.toast.success('Raça cadastrada com sucesso', 'Cadastro');
          this.resetForm();
          this.router.navigate(['racas'])
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

      this.service.create(newRaca).subscribe(observer);
    }
  }

  resetForm(): void {
    this.racaForm.reset({
      nome: '',
    });
  }

  get nome() {
    return this.racaForm.get('nome');
  }

  validaCampos(): boolean {
    return this.nome.valid;
  }
}
