import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PublicHeaderComponent } from '../../../layout/public-header/public-header.component';


@Component({
  selector: 'app-login',
  imports: [
    PublicHeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  hide = signal(true);

  constructor(private formBuilder: FormBuilder){
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
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

  submit(){
  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
