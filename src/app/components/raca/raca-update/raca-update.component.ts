import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { Raca } from 'src/app/models/Raca';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-raca-update',
  templateUrl: './raca-update.component.html',
  styleUrls: ['./raca-update.component.css']
})
export class RacaUpdateComponent {

  racaForm: FormGroup;

  raca: Raca = {
    id: '',
    nome: ''
  }

  constructor(private service: RacaService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
      this.racaForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
      });
     }

  ngOnInit(): void {
    this.raca.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }


  findById(): void {
    this.service.findById(this.raca.id).subscribe(resposta => {
      this.raca = resposta;
    });
  }

  update(): void {
    if (this.racaForm.valid) {
      const updateRaca: Raca = {
        nome: this.racaForm.value.nome,
      };

      const observer: Observer<Raca> = {
        next: () => {
          this.toast.success('Raça atualizada com sucesso', 'Update');
          this.resetForm();
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

      this.service.create(updateRaca).subscribe(observer);
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
    return this.nome ? this.nome.valid : false;
  }

}
