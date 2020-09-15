import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  get():string {
    return localStorage.getItem("colorOfHeader");
  }

  drop():void {
    localStorage.removeItem("colorOfHeader");
  }
  
}