import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BookService } from '../../core/service/book.service';
import { FeedbackService } from '../../core/service/feedback.service';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { mapStatus } from '../../shared/enums/status-leitura-labels';
import { BookResponse } from '../../shared/models/book-response';
import { PageResponse } from '../../shared/models/page-response';
import { DeleteBookDialogComponent } from '../delete-book-dialog/delete-book-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';



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

  pagination = signal<PageResponse<BookResponse> | null>(null);
  listBooks: BookResponse[] = [];
  filtroAtivo: StatusLeitura | null = StatusLeitura.LENDO;
  mapStatus = mapStatus;
  searchControl = new FormControl('');
  readonly StatusLeitura = StatusLeitura;
  protected readonly currentPage = signal(0);
  protected readonly pageSize = signal(5);

  constructor(private bookService: BookService, private matDialog: MatDialog, private feedBack: FeedbackService) {
  }


  ngOnInit(): void {
    this.carregarLivros();
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage.set(0);
        this.carregarLivros();
      })
  }


  carregarLivros() {
    this.bookService.listarLivros(this.currentPage(), this.pageSize(), this.filtroAtivo, this.searchControl.value).subscribe({
      next: (book) => {
        this.listBooks = book.content;
        this.pagination.set(book)
      },
      error: (error) => {
        if (error.error?.mensagem) {
          this.feedBack.showOnMessage(error.error.mensagem, 'OK')
        } else {
          this.feedBack.showOnMessage('Erro ao carregar livros', 'OK')
        }
      }

    });
  }

  proximaPagina() {
    if (this.pagination() && !this.pagination()?.last) {
      this.currentPage.update(atual => atual + 1);
      this.carregarLivros();
    }
  }

  paginaAnterior() {
    if (this.pagination() && !this.pagination()?.first) {
      this.currentPage.update(atual => atual - 1);
      this.carregarLivros();
    }
  }

  filtrarPorStatus(status: StatusLeitura | null) {
    this.filtroAtivo = status;
    this.currentPage.set(0);
    this.carregarLivros()
  }

  mostrarTodosLivros() {
    this.filtroAtivo = null;
    this.currentPage.set(0)
    this.carregarLivros()
  }

  progressoLeituraAtual(book: BookResponse): number {
    if (!book || !book.totalPaginas) {
      return 0
    }

    const percentual = (book.paginasLidas * 100) / book.totalPaginas;

    return Math.min(100, Math.round(percentual))
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

  deletarLivro(book: BookResponse) {
    const dialogRef = this.matDialog.open(DeleteBookDialogComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.carregarLivros();
      }
    })
  }
}