import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { BookService } from '../../core/service/book.service';
import { DashboardService } from '../../core/service/dashboard.service';
import { FeedbackService } from '../../core/service/feedback.service';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { BookResponse } from '../../shared/models/book-response';

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
    MatProgressBarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  proximasLeituras: BookResponse[] = [];
  continuarLeitura: BookResponse[] = [];

  totalLivros: number = 0;
  totalLendo: number = 0;
  totalQueroLer: number = 0;
  totalConcluidos: number = 0;
  totalAbandonados: number = 0;

  constructor(
    private bookService: BookService,
    private feedBack: FeedbackService,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarContinuarLeitura();
    this.carregarProximasLeituras();
  }

  carregarResumo() {
    this.dashboardService.buscarResumo().subscribe({
      next: (resumo) => {
        this.totalLivros = resumo.totalLivros;
        this.totalQueroLer =
          resumo.totalLivroPorStatus[StatusLeitura.QUERO_LER];
        this.totalLendo = resumo.totalLivroPorStatus[StatusLeitura.LENDO];
        this.totalConcluidos =
          resumo.totalLivroPorStatus[StatusLeitura.CONCLUIDO];
        this.totalAbandonados =
          resumo.totalLivroPorStatus[StatusLeitura.ABANDONEI];
      },
      error: (error) => {
        if (error.error?.mensagem) {
          this.feedBack.showOnMessage(error.error?.mensagem, 'OK');
        } else {
          this.feedBack.showOnMessage('Erro ao carregar as informações', 'OK');
        }
      },
    });
  }

  carregarProximasLeituras() {
    this.bookService
      .listarLivros(0, 3, StatusLeitura.QUERO_LER, null)
      .subscribe({
        next: (book) => {
          this.proximasLeituras = book.content;
        },
        error: (error) => {
          if (error.error?.mensagem) {
            this.feedBack.showOnMessage(error.error?.mensagem, 'OK');
          } else {
            this.feedBack.showOnMessage(
              'Erro ao carregar as informações',
              'OK',
            );
          }
        },
      });
  }

  carregarContinuarLeitura() {
    this.bookService.listarLivros(0, 3, StatusLeitura.LENDO, null).subscribe({
      next: (book) => {
        this.continuarLeitura = book.content;
      },
      error: (error) => {
        if (error.error?.mensagem) {
          this.feedBack.showOnMessage(error.error?.mensagem, 'OK');
        } else {
          this.feedBack.showOnMessage('Erro ao carregar as informações', 'OK');
        }
      },
    });
  }

  progressoLeituraAtual(book: BookResponse): number {
    if (!book || !book.totalPaginas) {
      return 0;
    }
    const percentual = (book.paginasLidas * 100) / book.totalPaginas;

    return Math.min(100, Math.round(percentual));
  }
}
