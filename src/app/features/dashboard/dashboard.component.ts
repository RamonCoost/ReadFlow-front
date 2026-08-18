import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { BookService } from '../../core/service/book.service';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { BookResponse } from '../../shared/models/book-response';
import { ContinueReading } from '../../shared/models/continue.reading';
import { NextReading } from '../../shared/models/next-reading';
import { FeedbackService } from '../../core/service/feedback.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatCardModule,
    MatToolbar,
    MatIcon,
    MatToolbarRow,
    MatButton,
    RouterLink,
    MatListModule,
    MatProgressBarModule
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

  constructor(private bookService: BookService, private feedBack: FeedbackService) {
  }

  ngOnInit(): void {
    this.carregarLivros()
  }

  carregarLivros() {
    this.bookService.listarLivros().subscribe({
      next: (books) => {
        this.listBooks = books;
        this.calcularResumo();
        this.carregarProximasLeituras();
        this.carregarContinuarLeitura();
      },
      error: (error) => {
        if (error.error?.mensagem) {
          this.feedBack.showOnMessage(error.error?.mensagem, 'OK');
        } else {
          this.feedBack.showOnMessage('Erro ao carregar as informações', 'OK');
        }
      }
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
    const livroEncontrado = this.listBooks.find(livro => livro.statusLeitura === StatusLeitura.LENDO)
    if (livroEncontrado?.statusLeitura === StatusLeitura.LENDO) {
      this.continuarLeitura = livroEncontrado
    }
    else {
      this.continuarLeitura = null;
    }
  }


  get progressoLeituraAtual(): number {

    if (!this.continuarLeitura || !this.continuarLeitura.totalPaginas) {
      return 0;
    }

    const percentual = (this.continuarLeitura.paginasLidas * 100) / this.continuarLeitura.totalPaginas;


    return Math.min(100, Math.round(percentual));
  }

}
