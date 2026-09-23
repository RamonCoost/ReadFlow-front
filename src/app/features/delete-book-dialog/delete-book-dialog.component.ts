import { Component, Inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookService } from '../../core/service/book.service';
import { FeedbackService } from '../../core/service/feedback.service';
import { BookResponse } from '../../shared/models/book-response';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-delete-book-dialog',
  imports: [
    MatCardModule,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './delete-book-dialog.component.html',
  styleUrl: './delete-book-dialog.component.scss',
})
export class DeleteBookDialogComponent {
  loading = signal<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: BookResponse,
    private bookService: BookService,
    private feedBack: FeedbackService,
    private dialogRef: MatDialogRef<DeleteBookDialogComponent>,
  ) {}

  deletarLivro() {
    this.loading.set(true);
    this.bookService
      .deletarLivro(this.book.id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.feedBack.showOnMessage('Livro deletado com sucesso', 'OK');
        },
        error: (error) => {
          if (error.error?.mensagem) {
            this.feedBack.showOnMessage(error.error.mensagem, 'OK');
          } else {
            this.feedBack.showOnMessage('Erro ao excluir o livro', 'OK');
          }
        },
      });
  }
}
