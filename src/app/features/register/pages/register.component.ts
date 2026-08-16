import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from "@angular/material/input";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../core/service/user.service';
import { PublicHeaderComponent } from "../../../layout/public-header/public-header.component";

@Component({
  selector: 'app-register',
  imports: [
    PublicHeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;
  hide = signal(true);

  private snack: MatSnackBar = inject(MatSnackBar);

  private readonly userService = inject(UserService);
  private readonly router = inject(Router)

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get nomeErrors(): string | null {
    const nomeErroscontrol = this.form.get('nome')
    if (nomeErroscontrol?.hasError('required')) return 'O campo "Nome" é obrigatório';
    if (nomeErroscontrol?.hasError('minlength')) return 'O campo "Nome" deve conter no minimo 3 letras';
    return null;
  }

  get emailErrors(): string | null {
    const emailErroscontrol = this.form.get('email')
    if (emailErroscontrol?.hasError('required')) return 'O campo "Email" é obrigatório';
    if (emailErroscontrol?.hasError('email')) return 'O campo "email" deve conter um email válido';
    return null;
  }

  get senhaErrors(): string | null {
    const senhaErroscontrol = this.form.get('senha')
    if (senhaErroscontrol?.hasError('required')) return 'O campo "Senha" é obrigatório';
    if (senhaErroscontrol?.hasError('minlength')) return 'O campo "Senha" deve conter no minimo 6 números e/ou letras';
    return null;
  }


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.form.getRawValue();
    this.userService.criarUsuario(formData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.showOnMessage('Erro ao cadastar usuário', 'Ok');
      }
    })
  }

  showOnMessage(menssage: string, action: string) {
    this.snack.open(menssage, action);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
