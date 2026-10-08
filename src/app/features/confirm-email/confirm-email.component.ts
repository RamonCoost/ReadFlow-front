import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../core/service/user.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-confirm-email',
  imports: [
    MatProgressSpinnerModule,
    MatButton,
    RouterLink,
    MatFormFieldModule,
    MatInput,
    MatCardModule,
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  token: string | null = null;
  email = signal<string>('');
  loading = signal<boolean>(true);
  loadingReenvio = signal<boolean>(false);
  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');
  mensagemSucessoReenvio = signal<string>('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');

      if (this.token) {
        this.userService
          .confirmarEmail(this.token)
          .pipe(
            finalize(() => {
              this.loading.set(false);
            }),
          )
          .subscribe({
            next: () => {
              this.mensagemSucesso.set('O email foi confirmado com sucesso');
            },
            error: (error: HttpErrorResponse) => {
              this.mensagemErro.set(error.error.mensagem);
            },
          });
      } else {
        this.loading.set(false);
        this.mensagemErro.set('Link de confirmação inválido');
        return;
      }
    });
  }

  reenviarEmail() {
    this.loadingReenvio.set(true);

    const email = this.email();

    this.userService
      .reenviarEmail(email)
      .pipe(
        finalize(() => {
          this.loadingReenvio.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.mensagemErro.set('');
          this.mensagemSucessoReenvio.set(
            'Se houver uma conta pendente de confirmação para esse e-mail, um novo link foi enviado.',
          );
        },
        error: () => {
          this.mensagemErro.set('Falha no Envio');
        },
      });
  }
}
