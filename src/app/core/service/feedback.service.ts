import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly snack: MatSnackBar = inject(MatSnackBar);

  showOnMessage(message: string, action: string) {
    this.snack.open(message, action, { duration: 2000});
  }

}
