import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertManagerService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 10000,
      verticalPosition: 'bottom'
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 10000,
      verticalPosition: 'bottom'
    });
  }
}