import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { validarLimitePaginasLidas, VerificadorErroPaginasLidas } from '../../shared/validators/bookValidator';
import { BookService } from '../../core/service/book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-book',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
  ],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateBookComponent {
  form: FormGroup;

  public readonly erroPaginasLidas = new VerificadorErroPaginasLidas();

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router) {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', [Validators.required, Validators.minLength(3)]],
      totalPaginas: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      paginasLidas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    },
      {
        validators: validarLimitePaginasLidas
      })
  };


  get titulo() {
    return this.form.get('titulo');
  }

  get autor() {
    return this.form.get('autor');
  }

  get totalPaginas() {
    return this.form.get('totalPaginas');
  }

  get paginasLidas() {
    return this.form.get('paginasLidas');
  }


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched;
    }
    const formData = this.form.value;
    this.bookService.criarLivro(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/books'])
      },
      error: (erro) => {
        console.error(`Erro ao adicionar o livro`, erro)
      }
    })
  }
}