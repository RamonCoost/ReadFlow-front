import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookResponse } from '../../shared/models/book-response';
import { BookService } from '../../core/service/book.service';
import { mapStatus } from '../../shared/enums/status-leitura-labels'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { StatusLeitura } from '../../shared/enums/status-leitura';

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
],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {

  listBooks: BookResponse[] = [];
  filteredBooks: BookResponse[] = [];
  readonly StatusLeitura = StatusLeitura;
  mapStatus = mapStatus;

  constructor(private bookService: BookService) {
  }


  ngOnInit(): void {
    this.carregarLivros();
  }


  carregarLivros() {
    this.bookService.listarLivros().subscribe((book => {
      this.listBooks = book;
      this.filteredBooks = this.listBooks;
    }));
  }

  filtrarPorStatus(status: StatusLeitura){
    this.filteredBooks = this.listBooks.filter(book => book.statusLeitura === status);
  }

  mostrarTodosLivros(){
    this.filteredBooks = this.listBooks;
  }

  progressoLeituraAtual(book: BookResponse): number {
    if (!book || !book.totalPaginas) {
      return 0
    }

    const percentual = (book.paginasLidas * 100) / book.totalPaginas;

    return Math.min(100, Math.round(percentual))
  }

}
