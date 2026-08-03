import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogClose, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { BookService } from '../../core/service/book.service';
import { BookResponse } from '../../shared/models/book-response';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { MatLabel } from '@angular/material/form-field';


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
],
  templateUrl: './delete-book-dialog.component.html',
  styleUrl: './delete-book-dialog.component.scss'
})
export class DeleteBookDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public book: BookResponse, private bookService: BookService, private dialogRef: MatDialogRef<DeleteBookDialogComponent>) { }

  deletarLivro() {
    this.bookService.deletarLivro(this.book.id).subscribe({
      next: () => {
        this.dialogRef.close(true)
      },
      error: (erro) => {
        console.error(`Erro ao deletar o livro`, erro)
      }
    })
  }
}

