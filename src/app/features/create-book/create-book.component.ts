import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { BookService } from '../../core/service/book.service';
import { FeedbackService } from '../../core/service/feedback.service';
import { BooksSearchResponse } from '../../shared/models/books-search-response';
import { validarLimitePaginasLidas, VerificadorErroPaginasLidas } from '../../shared/validators/bookValidator';
import { MatListModule } from '@angular/material/list';
import { CreateBookRequest } from '../../shared/models/create-book-request';


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
    MatProgressSpinner,
    FormsModule,
    MatListModule
],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateBookComponent {
  form: FormGroup;

  loading = signal<boolean>(false);

  termoPesquisa = signal<string>('');

  mostrarFormulario = signal<boolean>(false);

  listaPesquisaLivros = signal<BooksSearchResponse[]>([]);

  livroSelecionado = signal<BooksSearchResponse | null>(null);

  public readonly erroPaginasLidas = new VerificadorErroPaginasLidas();

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router, private feedBack: FeedbackService) {
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

  pesquisarLivros() {
    const termo = this.termoPesquisa().trim();
    if (termo === '') {
      return;
    }
    this.bookService.pesquisaLivros(termo).subscribe({
      next: (response) => {
        this.listaPesquisaLivros.set(response);
      }
    });
  }

  limparPesquisa(){
    this.termoPesquisa.set('');
    this.listaPesquisaLivros.set([]);
    this.mostrarFormulario.set(false);
    this.livroSelecionado.set(null);
  }

  selecionarLivro(book: BooksSearchResponse) {
    this.livroSelecionado.set(book);
    this.form.patchValue({
      titulo: book.titulo,
      autor: book.autores ? book.autores[0] : '',
      totalPaginas: book.totalPaginas ? book.totalPaginas : null
    });
    this.mostrarFormulario.set(true);

    console.log(book.capa);
  }

  trocarLivro() {
    this.livroSelecionado();
    this.mostrarFormulario.set(false);
    this.listaPesquisaLivros();
    this.form.reset();
  }

  adicionarManualmente() {
    this.mostrarFormulario.set(true);
    this.livroSelecionado.set(null);
    this.form.reset();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    const formData = this.form.value;
    const book: CreateBookRequest = {
      ...formData,
      capa: this.livroSelecionado()?.capa ?? null
    }
    this.bookService.criarLivro(book).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/books'])
        this.feedBack.showOnMessage('livro adicionado com sucesso.', 'OK')
      },
      error: (error) => {
        this.loading.set(false);
        if (error.error?.mensagem) {
          this.feedBack.showOnMessage(error.error.mensagem, 'OK');
        } else {
          this.feedBack.showOnMessage('Erro ao adicionar o livro', 'OK');
        }
      }
    })
  }
}