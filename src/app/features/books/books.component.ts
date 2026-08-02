import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookResponse } from '../../shared/models/book-response';
import { BookService } from '../../core/service/book.service';
import { mapStatus } from '../../shared/enums/status-leitura-labels'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { MatMenuModule } from '@angular/material/menu';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-books',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {

  listBooks: BookResponse[] = [];
  filteredBooks: BookResponse[] = [];
  filtroAtivo: StatusLeitura | 'TODOS' = 'TODOS';
  mapStatus = mapStatus;
  searchControl = new FormControl('');
  readonly StatusLeitura = StatusLeitura;

  constructor(private bookService: BookService, private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    this.carregarLivros();

    this.searchControl.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    })

  }


  carregarLivros() {
    this.bookService.listarLivros().subscribe((book => {
      this.listBooks = book;
      this.aplicarFiltros();
    }));
  }

  filtrarPorStatus(status: StatusLeitura | 'TODOS') {
    this.filtroAtivo = status;
    this.aplicarFiltros();
  }

  mostrarTodosLivros() {
    this.filtroAtivo = 'TODOS';
    this.aplicarFiltros();
  }

  progressoLeituraAtual(book: BookResponse): number {
    if (!book || !book.totalPaginas) {
      return 0
    }

    const percentual = (book.paginasLidas * 100) / book.totalPaginas;

    return Math.min(100, Math.round(percentual))
  }

  aplicarFiltros() {
    let resultado = this.listBooks;

    if (this.filtroAtivo !== 'TODOS') {
      resultado = resultado.filter(book => book.statusLeitura === this.filtroAtivo)
    }

    let pesquisaTexto = this.searchControl.value?.trim().toLowerCase() ?? '';

    if (pesquisaTexto) {
      resultado = resultado.filter(book =>
        book.titulo.trim().toLowerCase().includes(pesquisaTexto)
        || book.autor.trim().toLowerCase().includes(pesquisaTexto)
        || book.id.toString().includes(pesquisaTexto)
      );
    }
    this.filteredBooks = resultado;
  }

  editarLivro(book: BookResponse) {
    const dialogRef = this.matDialog.open(EditBookDialogComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.carregarLivros();
      }
    })
  }
}