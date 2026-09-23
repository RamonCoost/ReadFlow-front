import { Component, Inject, signal, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookService } from '../../core/service/book.service';
import { FeedbackService } from '../../core/service/feedback.service';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { BookResponse } from '../../shared/models/book-response';
import { validarLimitePaginasLidas } from '../../shared/validators/bookValidator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-book-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatCheckboxModule,
    MatDialogClose,
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-book-dialog.component.html',
  styleUrl: './edit-book-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditBookDialogComponent {
  form: FormGroup;
  loading = signal<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: BookResponse,
    private formBiuld: FormBuilder,
    private bookService: BookService,
    private feedBack: FeedbackService,
    private dialogRef: MatDialogRef<EditBookDialogComponent>,
  ) {
    this.form = formBiuld.group(
      {
        titulo: [book.titulo, [Validators.required, Validators.minLength(3)]],
        autor: [book.autor, [Validators.required, Validators.minLength(3)]],
        totalPaginas: [
          book.totalPaginas,
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        paginasLidas: [
          book.paginasLidas,
          [Validators.required, Validators.pattern('^[0-9]+$')],
        ],
        abandonado: book.statusLeitura === StatusLeitura.ABANDONEI,
      },
      {
        validators: validarLimitePaginasLidas,
      },
    );
  }

  salvarLivroAtualizado() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const formData = this.form.value;
    this.bookService
      .atualizarLivro(this.book.id, formData)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.feedBack.showOnMessage('Livro editado com sucesso', 'OK');
        },
        error: (error) => {
          if (error.error?.mensagem) {
            this.feedBack.showOnMessage(error.error.mensagem, 'OK');
          } else {
            this.feedBack.showOnMessage('Erro ao editar', 'OK');
          }
        },
      });
  }
}
