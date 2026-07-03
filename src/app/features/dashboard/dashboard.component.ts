import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatIcon } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { BookService } from '../../core/service/book.service';
import { BookResponse } from '../../shared/models/book-response';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { NextReading } from '../../shared/models/next-reading';
import { ContinueReading } from '../../shared/models/continue.reading';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatCardModule,
    MatToolbar,
    MatIcon,
    MatToolbarRow,
    MatButton,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  listBooks: BookResponse[] = [];
  proximasLeituras: NextReading[] = [];
  continuarLeitura: ContinueReading | null = null;

  totalLivros: number = 0;
  totalLendo: number = 0;
  totalQueroLer: number = 0;
  totalConcluidos: number = 0;
  totalAbandonados: number = 0;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.carregarLivros()
  }

  carregarLivros() {
    this.bookService.listarLivros().subscribe((books) => {
      this.listBooks = books;
      this.calcularResumo();
      this.carregarProximasLeituras();
      this.carregarContinuarLeitura();
    })
  }

  calcularResumo() {
    this.totalLivros = this.listBooks.length;
    this.totalLendo = this.listBooks.filter(b => b.statusLeitura === StatusLeitura.LENDO).length
    this.totalConcluidos = this.listBooks.filter(b => b.statusLeitura === StatusLeitura.CONCLUIDO).length
    this.totalQueroLer = this.listBooks.filter(b => b.statusLeitura === StatusLeitura.QUERO_LER).length
    this.totalAbandonados = this.listBooks.filter(b => b.statusLeitura === StatusLeitura.ABANDONEI).length
  }

  carregarProximasLeituras() {
    this.proximasLeituras = this.listBooks.map(livro => {
      return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        statusLeitura: livro.statusLeitura
      }
    }).filter(livro => livro.statusLeitura === StatusLeitura.QUERO_LER)
  }

  carregarContinuarLeitura() {
    const livroEncontrado = this.listBooks.find (livro => livro.statusLeitura === StatusLeitura.LENDO)
    if(livroEncontrado?.statusLeitura === StatusLeitura.LENDO){
      this.continuarLeitura = livroEncontrado
    }
    else{
      this.continuarLeitura = null;
    }
  }
}
