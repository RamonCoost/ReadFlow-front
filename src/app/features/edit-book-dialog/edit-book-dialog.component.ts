import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookResponse } from '../../shared/models/book-response';
import { validarLimitePaginasLidas } from '../../shared/validators/bookValidator';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookService } from '../../core/service/book.service';

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
    MatDialogClose
  ],
  templateUrl: './edit-book-dialog.component.html',
  styleUrl: './edit-book-dialog.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditBookDialogComponent {

  form: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public book: BookResponse, private formBiuld: FormBuilder, private bookService: BookService, private dialogRef: MatDialogRef<EditBookDialogComponent> ) {
    this.form = formBiuld.group({
      titulo: [book.titulo, [Validators.required, Validators.minLength(3)]],
      autor: [book.autor, [Validators.required, Validators.minLength(3)]],
      totalPaginas: [book.totalPaginas, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      paginasLidas: [book.paginasLidas, [Validators.required, Validators.pattern('^[0-9]+$')]],
      abandonado: book.statusLeitura === StatusLeitura.ABANDONEI
    }, {
      validators: validarLimitePaginasLidas
    })
  }

  salvarLivroAtualizado() {
    const formData = this.form.value;
    this.bookService.atualizarLivro(this.book.id, formData).subscribe({
        next: (response) => {
        this.dialogRef.close(response)
      },
      error: (erro) => {
        console.error(`Erro ao editar o livro`, erro)
      }
    })
  }

}
