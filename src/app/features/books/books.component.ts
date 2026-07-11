import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookResponse } from '../../shared/models/book-response';
import { BookService } from '../../core/service/book.service';
import { mapStatus } from '../../shared/enums/status-leitura-labels' 

@Component({
  selector: 'app-books',
  imports: [MatToolbarModule, MatCardModule,MatIconModule,MatListModule,MatProgressBarModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit, OnDestroy{

  listBook: BookResponse[] = [];

  mapStatus = mapStatus;

  constructor(private bookService: BookService){
  }


  ngOnInit(): void {
    this.carregarLivros();
  }
  
  ngOnDestroy(): void {

  }

  carregarLivros(){
    this.bookService.listarLivros().subscribe((book => {
      this.listBook = book
    }));
  }

  progressoLeituraAtual(book:BookResponse): number{
  if(!book || !book.totalPaginas){
    return 0
  }

  const percentual = (book.paginasLidas * 100) / book.totalPaginas;

  return Math.min(100, Math.round(percentual))
}
  
}
